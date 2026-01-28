import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'jsr:@supabase/supabase-js@2.49.8';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Enable logger
app.use('*', logger(console.log));

// Root endpoint
app.get("/", (c) => {
  return c.json({ 
    message: "Potenlab Server API",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get("/make-server-2a57c5c9/health", (c) => {
  return c.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    server: "make-server-2a57c5c9"
  });
});

// Naver site verification file
app.get("/make-server-2a57c5c9/naver0ed4334c54a63c176e5e0d31611686362999c40b.html", (c) => {
  return c.html("naver-site-verification: 0ed4334c54a63c176e5e0d31611686362999c40b");
});

// OG Image endpoint - serves the main OG image
app.get("/make-server-2a57c5c9/og.png", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    
    const bucketName = 'make-2a57c5c9-og-images';
    
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log('Creating OG images bucket:', bucketName);
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true, // Public bucket for OG images
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      });
      if (error) {
        console.error('Error creating OG images bucket:', error);
      }
    }
    
    // Check if og.png exists in storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from(bucketName)
      .download('og.png');
    
    if (fileError || !fileData) {
      console.log('OG image not found in storage, returning placeholder');
      // Return a simple text response if image not found
      return c.text('OG image not uploaded yet. Please upload via /upload-og-image endpoint.', 404);
    }
    
    // Convert blob to array buffer
    const arrayBuffer = await fileData.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Return the image with proper headers
    return c.body(bytes, 200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000',
    });
  } catch (error) {
    console.error('Error serving OG image:', error);
    return c.text('Error serving OG image', 500);
  }
});

// Upload OG Image endpoint
app.post("/make-server-2a57c5c9/upload-og-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    
    const bucketName = 'make-2a57c5c9-og-images';
    
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log('Creating OG images bucket:', bucketName);
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
      });
    }
    
    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Upload to storage (overwrites if exists)
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload('og.png', bytes, {
        contentType: 'image/png',
        upsert: true // Overwrite if exists
      });
    
    if (error) {
      console.error('Error uploading OG image:', error);
      return c.json({ error: 'Failed to upload image' }, 500);
    }
    
    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucketName)
      .getPublicUrl('og.png');
    
    const publicUrl = `https://www.potenlab.dev/og.png`;
    
    console.log('✅ OG image uploaded successfully:', publicUrl);
    
    return c.json({ 
      success: true, 
      url: publicUrl,
      storageUrl: publicData.publicUrl
    });
  } catch (error) {
    console.error('Error in upload-og-image endpoint:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Portfolio endpoints

// Get all portfolios
app.get("/make-server-2a57c5c9/portfolios", async (c) => {
  try {
    const portfolios = await kv.getByPrefix('portfolio:');
    return c.json({ portfolios: portfolios || [] });
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return c.json({ error: 'Failed to fetch portfolios' }, 500);
  }
});

// Get single portfolio by ID
app.get("/make-server-2a57c5c9/portfolios/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // First try to find by URL field
    const allPortfolios = await kv.getByPrefix('portfolio:');
    let portfolio = allPortfolios.find((p: any) => p.url === id);
    
    // If not found by URL, try by actual ID
    if (!portfolio) {
      portfolio = await kv.get(`portfolio:${id}`);
    }
    
    if (!portfolio) {
      return c.json({ error: 'Portfolio not found' }, 404);
    }
    
    // Prepare sections for detail view
    const sections = [];
    if (portfolio.overview_ko || portfolio.overview_en) {
      sections.push({
        id: '01',
        title: 'ko' ? portfolio.overview_ko?.split('\n')[0] : portfolio.overview_en?.split('\n')[0] || 'Project Overview',
        description: 'ko' ? portfolio.overview_ko : portfolio.overview_en
      });
    }
    if (portfolio.features_ko || portfolio.features_en) {
      sections.push({
        id: '02',
        title: 'Key Features',
        description: 'ko' ? portfolio.features_ko : portfolio.features_en
      });
    }
    if (portfolio.techStack) {
      sections.push({
        id: '03',
        title: 'Tech Stack',
        description: portfolio.techStack
      });
    }
    if (portfolio.duration) {
      sections.push({
        id: '04',
        title: 'Project Duration',
        description: portfolio.duration
      });
    }
    
    return c.json({ 
      portfolio: {
        ...portfolio,
        sections,
        title: 'ko' ? portfolio.title_ko : portfolio.title_en,
        description: 'ko' ? portfolio.description_ko : portfolio.description_en,
        images: [portfolio.coverImage, ...(portfolio.images || [])],
        comments: []
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return c.json({ error: 'Failed to fetch portfolio' }, 500);
  }
});

// Create new portfolio
app.post("/make-server-2a57c5c9/portfolios", async (c) => {
  try {
    const data = await c.req.json();
    const id = `portfolio-${Date.now()}`;
    
    const portfolio = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`portfolio:${id}`, portfolio);
    
    return c.json({ success: true, portfolio }, 201);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    return c.json({ error: 'Failed to create portfolio', details: String(error) }, 500);
  }
});

// Update portfolio
app.put("/make-server-2a57c5c9/portfolios/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    
    const existing = await kv.get(`portfolio:${id}`);
    if (!existing) {
      return c.json({ error: 'Portfolio not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...data,
      id, // Keep original ID
      createdAt: existing.createdAt, // Keep original creation time
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`portfolio:${id}`, updated);
    
    return c.json({ success: true, portfolio: updated });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return c.json({ error: 'Failed to update portfolio', details: String(error) }, 500);
  }
});

// Delete portfolio
app.delete("/make-server-2a57c5c9/portfolios/:id", async (c) => {
  try {
    const id = c.req.param('id');
    console.log('Attempting to delete portfolio with ID:', id);
    console.log('Looking for key:', `portfolio:${id}`);
    
    const existing = await kv.get(`portfolio:${id}`);
    console.log('Existing portfolio found:', existing ? 'yes' : 'no');
    
    if (!existing) {
      console.log('Portfolio not found, returning 404');
      return c.json({ error: 'Portfolio not found' }, 404);
    }
    
    console.log('Deleting portfolio...');
    await kv.del(`portfolio:${id}`);
    console.log('Portfolio deleted successfully');
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return c.json({ error: 'Failed to delete portfolio', details: String(error) }, 500);
  }
});

// Reorder portfolios
app.post("/make-server-2a57c5c9/portfolios/reorder", async (c) => {
  try {
    const { portfolios } = await c.req.json();
    
    if (!Array.isArray(portfolios)) {
      return c.json({ error: 'Invalid request: portfolios must be an array' }, 400);
    }
    
    // Update each portfolio with new order
    for (const { id, order } of portfolios) {
      const cleanId = id.startsWith('portfolio:') ? id.substring('portfolio:'.length) : id;
      const existing = await kv.get(`portfolio:${cleanId}`);
      
      if (existing) {
        await kv.set(`portfolio:${cleanId}`, {
          ...existing,
          order,
          updatedAt: new Date().toISOString()
        });
      }
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error reordering portfolios:', error);
    return c.json({ error: 'Failed to reorder portfolios', details: String(error) }, 500);
  }
});

// Batch update portfolios category (web/app -> Platform)
app.post("/make-server-2a57c5c9/portfolios/batch-update-category", async (c) => {
  try {
    const allPortfolios = await kv.getByPrefix('portfolio:');
    let updatedCount = 0;
    
    for (const portfolio of allPortfolios) {
      const category = portfolio.category?.toLowerCase();
      
      // Update web or app to Platform
      if (category === 'web' || category === 'app') {
        const cleanId = portfolio.id.startsWith('portfolio:') 
          ? portfolio.id.substring('portfolio:'.length) 
          : portfolio.id;
        
        await kv.set(`portfolio:${cleanId}`, {
          ...portfolio,
          category: 'Platform',
          updatedAt: new Date().toISOString()
        });
        
        updatedCount++;
        console.log(`Updated portfolio ${cleanId} from ${portfolio.category} to Platform`);
      }
    }
    
    return c.json({ 
      success: true, 
      message: `Successfully updated ${updatedCount} portfolios`,
      updatedCount 
    });
  } catch (error) {
    console.error('Error batch updating portfolios:', error);
    return c.json({ error: 'Failed to batch update portfolios', details: String(error) }, 500);
  }
});

// Upload image for article editor
app.post("/make-server-2a57c5c9/upload-image", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'File must be an image' }, 400);
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return c.json({ error: 'File size must be less than 5MB' }, 400);
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    
    const bucketName = 'make-2a57c5c9-article-images';
    
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true, // Public bucket for article images
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      });
      if (createError) {
        // Ignore "already exists" error (can happen in race conditions)
        if (!createError.message?.includes('already exists')) {
          console.error('Failed to create bucket:', createError);
          return c.json({ error: 'Failed to create storage bucket' }, 500);
        }
      }
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload file
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, new Uint8Array(arrayBuffer), {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Failed to upload file', details: error.message }, 500);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return c.json({ 
      success: true, 
      url: publicUrl,
      fileName: fileName
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return c.json({ error: 'Failed to upload image', details: String(error) }, 500);
  }
});

// Upload thumbnail for articles
app.post("/make-server-2a57c5c9/upload-thumbnail", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return c.json({ error: 'File must be an image' }, 400);
    }
    
    // Validate file size (10MB max for thumbnails)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: 'File size must be less than 10MB' }, 400);
    }
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    
    const bucketName = 'make-2a57c5c9-article-thumbnails';
    
    // Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true, // Public bucket for article thumbnails
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      });
      if (createError) {
        // Ignore "already exists" error (can happen in race conditions)
        if (!createError.message?.includes('already exists')) {
          console.error('Failed to create bucket:', createError);
          return c.json({ error: 'Failed to create storage bucket' }, 500);
        }
      }
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `thumbnail-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload file
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, new Uint8Array(arrayBuffer), {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: 'Failed to upload file', details: error.message }, 500);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return c.json({ 
      success: true, 
      url: publicUrl,
      fileName: fileName
    });
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return c.json({ error: 'Failed to upload thumbnail', details: String(error) }, 500);
  }
});

// Article endpoints

// Get all articles
app.get("/make-server-2a57c5c9/articles", async (c) => {
  try {
    const articles = await kv.getByPrefix('article:');
    return c.json({ articles: articles || [] });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get single article by ID
app.get("/make-server-2a57c5c9/articles/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // First try to find by URL field
    const allArticles = await kv.getByPrefix('article:');
    let article = allArticles.find((a: any) => a.url === id);
    
    // If not found by URL, try by actual ID
    if (!article) {
      article = await kv.get(`article:${id}`);
    }
    
    if (!article) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    return c.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Create new article
app.post("/make-server-2a57c5c9/articles", async (c) => {
  try {
    const data = await c.req.json();
    const id = `article-${Date.now()}`;
    
    const article = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`article:${id}`, article);
    
    return c.json({ success: true, article }, 201);
  } catch (error) {
    console.error('Error creating article:', error);
    return c.json({ error: 'Failed to create article', details: String(error) }, 500);
  }
});

// Update article
app.put("/make-server-2a57c5c9/articles/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    
    const existing = await kv.get(`article:${id}`);
    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...data,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`article:${id}`, updated);
    
    return c.json({ success: true, article: updated });
  } catch (error) {
    console.error('Error updating article:', error);
    return c.json({ error: 'Failed to update article', details: String(error) }, 500);
  }
});

// Delete article
app.delete("/make-server-2a57c5c9/articles/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const existing = await kv.get(`article:${id}`);
    if (!existing) {
      return c.json({ error: 'Article not found' }, 404);
    }
    
    await kv.del(`article:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return c.json({ error: 'Failed to delete article', details: String(error) }, 500);
  }
});

// Course endpoints

// Get all courses
app.get("/make-server-2a57c5c9/courses", async (c) => {
  try {
    const courses = await kv.getByPrefix('course:');
    return c.json({ courses: courses || [] });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return c.json({ error: 'Failed to fetch courses' }, 500);
  }
});

// Get single course by ID
app.get("/make-server-2a57c5c9/courses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const course = await kv.get(`course:${id}`);
    
    if (!course) {
      return c.json({ error: 'Course not found' }, 404);
    }
    
    return c.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return c.json({ error: 'Failed to fetch course' }, 500);
  }
});

// Create new course
app.post("/make-server-2a57c5c9/courses", async (c) => {
  try {
    const data = await c.req.json();
    const id = `course-${Date.now()}`;
    
    const course = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`course:${id}`, course);
    
    return c.json({ success: true, course }, 201);
  } catch (error) {
    console.error('Error creating course:', error);
    return c.json({ error: 'Failed to create course', details: String(error) }, 500);
  }
});

// Update course
app.put("/make-server-2a57c5c9/courses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    
    const existing = await kv.get(`course:${id}`);
    if (!existing) {
      return c.json({ error: 'Course not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...data,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`course:${id}`, updated);
    
    return c.json({ success: true, course: updated });
  } catch (error) {
    console.error('Error updating course:', error);
    return c.json({ error: 'Failed to update course', details: String(error) }, 500);
  }
});

// Delete course
app.delete("/make-server-2a57c5c9/courses/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const existing = await kv.get(`course:${id}`);
    if (!existing) {
      return c.json({ error: 'Course not found' }, 404);
    }
    
    await kv.del(`course:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return c.json({ error: 'Failed to delete course', details: String(error) }, 500);
  }
});

// Initialize sample courses
app.post("/make-server-2a57c5c9/courses/init-samples", async (c) => {
  try {
    // Sample courses data
    const sampleCourses = [
      // Business - 사업계획서 작성
      {
        type: 'business',
        category_ko: '사업계획서 작성',
        category_en: 'Business Plan',
        title_ko: '[Biz] 사업계획서 작성 가이드북 (2025 ver)',
        title_en: '[Biz] Business Plan Guide Book (2025 ver)',
        description_ko: '2025년 최신 사업계획서 작성 가이드북 - 전자책',
        description_en: '2025 Latest Business Plan Guide Book - E-book',
        price: 59900,
        rating: 0.0,
        thumbnail: 'https://images.unsplash.com/photo-1743385779313-ac03bb0f997b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBsYW4lMjBkb2N1bWVudHxlbnwxfHx8fDE3NjUyNzQ4ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryTag_ko: '가이드북 (전자책)',
        categoryTag_en: 'Guide Book (E-book)',
        order: 0,
        url: 'https://kmong.com/gig/584208'
      },
      {
        type: 'business',
        category_ko: '사업계획서 작성',
        category_en: 'Business Plan',
        title_ko: '[Biz] 사업계획서 작성 샘플 (2025 청년창업사관학교 ver)',
        title_en: '[Biz] Business Plan Sample (2025 Youth Startup Academy ver)',
        description_ko: '2025년 청년창업사관학교 사업계획서 작성 샘플',
        description_en: '2025 Youth Startup Academy Business Plan Sample',
        price: 29900,
        rating: 0.0,
        thumbnail: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwdGVtcGxhdGV8ZW58MXx8fHwxNzY1MTkzMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryTag_ko: '샘플 자료',
        categoryTag_en: 'Sample Material',
        order: 1,
        url: 'https://kmong.com/gig/596039'
      },
      {
        type: 'business',
        category_ko: '사업계획서 작성',
        category_en: 'Business Plan',
        title_ko: '[Biz] 사업계획서 작성 샘플 (2024 예비창업패키지 ver)',
        title_en: '[Biz] Business Plan Sample (2024 Pre-Startup Package ver)',
        description_ko: '2024년 예비창업패키지 사업계획서 작성 샘플',
        description_en: '2024 Pre-Startup Package Business Plan Sample',
        price: 30000,
        rating: 5.0,
        thumbnail: 'https://images.unsplash.com/photo-1599592187465-6dc742367282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2NTI3NDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        categoryTag_ko: '샘플 자료',
        categoryTag_en: 'Sample Material',
        order: 2,
        url: 'https://kmong.com/gig/541850'
      },
      // Business - 발표&IR준비
      {
        type: 'business',
        category_ko: '발표&IR준비',
        category_en: 'Presentation & IR',
        title_ko: '[Biz] 발표자료 준비를 위한 템플릿 (PPT)',
        title_en: '[Biz] Presentation Template (PPT)',
        description_ko: '실무에서 사용하는 발표자료 템플릿 (PPT)',
        description_en: 'Professional Presentation Template (PPT)',
        price: 12900,
        rating: 0.0,
        thumbnail: 'https://images.unsplash.com/photo-1666148610265-5e64d889574b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzZW50YXRpb24lMjBzbGlkZXMlMjB0ZW1wbGF0ZXxlbnwxfHx8fDE3NjUyNzQ4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryTag_ko: '템플릿 자료',
        categoryTag_en: 'Template Material',
        order: 0,
        url: 'https://kmong.com/gig/489562'
      },
      {
        type: 'business',
        category_ko: '발표&IR준비',
        category_en: 'Presentation & IR',
        title_ko: '[Biz] 발표자료 준비를 위한 템플릿 + 샘플',
        title_en: '[Biz] Presentation Template + Sample',
        description_ko: '실무에서 사용하는 발표자료 템플릿(PPT) + 샘플(PDF)',
        description_en: 'Professional Presentation Template (PPT) + Sample (PDF)',
        price: 19900,
        rating: 0.0,
        thumbnail: 'https://images.unsplash.com/photo-1590097520505-416422f07ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXRjaCUyMGRlY2slMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY1MTczNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        categoryTag_ko: '템플릿 자료',
        categoryTag_en: 'Template Material',
        order: 1,
        url: 'https://kmong.com/gig/572372'
      },
      // Planning
      {
        type: 'planning',
        category_ko: 'IT 컨설팅',
        category_en: 'IT Consulting',
        title_ko: '#2 IT서비스 상세 기획서',
        title_en: '#2 IT Service Detail Specification',
        description_ko: '[IT컨설팅] 실무에서 사용하는 IT 서비스 상세 기획서 예문작성 + 실습',
        description_en: '[IT Consulting] IT Service detailed specification with examples + Practice',
        price: 19900,
        rating: 3.5,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
        categoryTag_ko: 'IT 컨설팅 실무',
        categoryTag_en: 'IT Consulting Practice',
        order: 2,
        url: 'https://kmong.com/gig/437835'
      },
      {
        type: 'planning',
        category_ko: '서비스 기',
        category_en: 'Service Planning',
        title_ko: '#1-1 아이디어 구체화 실습',
        title_en: '#1-1 Idea Specification Practice',
        description_ko: '[서비스기획] 실무에서 사용하는 아이디어 구체화 작성 법칙!',
        description_en: '[Service Planning] Learn practical idea specification methods used in the field!',
        price: 29900,
        rating: 5.0,
        thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop',
        categoryTag_ko: '실무에서 사용하는',
        categoryTag_en: 'Used in Practice',
        order: 0,
        url: 'https://kmong.com/gig/380895'
      },
      {
        type: 'planning',
        category_ko: '서비스 기획',
        category_en: 'Service Planning',
        title_ko: '#1-2 아이디어 구조화 과정',
        title_en: '#1-2 Idea Structuring Process',
        description_ko: '[서비스기획] 실무에서 사용하는 아이디어 구조화 과정 + 실습 (PPT, Excel, Word)',
        description_en: '[Service Planning] Practical idea structuring process + Practice (PPT, Excel, Word)',
        price: 9900,
        rating: 0.0,
        thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop',
        categoryTag_ko: '실무에서 사용하는',
        categoryTag_en: 'Used in Practice',
        order: 1,
        url: 'https://kmong.com/gig/437813'
      },
      // UX/UI
      {
        type: 'uxui',
        category_ko: 'UX/UI 디자인',
        category_en: 'UX/UI Design',
        title_ko: 'UX/UI 디자인 라이브러리',
        title_en: 'UX/UI Design Library',
        description_ko: '[UX] UX/UI 디자인 라이브러리 (디자인 시스템 + 앱 UI 템플릿)',
        description_en: '[UX] UX/UI Design Library (Design System + App UI Templates)',
        price: 231000,
        originalPrice: 330000,
        rating: 5.0,
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
        categoryTag_ko: 'UX/UI 실무 자료',
        categoryTag_en: 'UX/UI Practice Materials',
        order: 0,
        url: 'https://kmong.com/gig/572335'
      },
      {
        type: 'uxui',
        category_ko: 'UI 디자인 패턴',
        category_en: 'UI Design Patterns',
        title_ko: 'React 컴포넌트 라이브러리',
        title_en: 'React Component Library',
        description_ko: '[개발] 실무에서 바로 사용 가능한 React 컴포넌트 모음',
        description_en: '[Development] Ready-to-use React component collection',
        price: 49900,
        rating: 4.5,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
        categoryTag_ko: '개발 실무 자료',
        categoryTag_en: 'Development Materials',
        order: 1,
        url: 'https://kmong.com'
      }
    ];

    // Save sample courses
    for (const courseData of sampleCourses) {
      const id = `course-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const course = {
        id,
        ...courseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await kv.set(`course:${id}`, course);
      // Add small delay to ensure unique timestamps
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    return c.json({ 
      success: true, 
      message: 'Sample courses initialized', 
      count: sampleCourses.length 
    });
  } catch (error) {
    console.error('Error initializing sample courses:', error);
    return c.json({ error: 'Failed to initialize sample courses', details: String(error) }, 500);
  }
});

// Inquiry endpoints

// Get all inquiries
app.get("/make-server-2a57c5c9/inquiries", async (c) => {
  try {
    const inquiries = await kv.getByPrefix('inquiry:');
    // Sort by creation date (newest first)
    const sorted = (inquiries || []).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return c.json({ inquiries: sorted });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return c.json({ error: 'Failed to fetch inquiries' }, 500);
  }
});

// Get single inquiry by ID
app.get("/make-server-2a57c5c9/inquiries/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const inquiry = await kv.get(`inquiry:${id}`);
    
    if (!inquiry) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }
    
    return c.json({ inquiry });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return c.json({ error: 'Failed to fetch inquiry' }, 500);
  }
});

// Create new inquiry (from contact form)
app.post("/make-server-2a57c5c9/inquiries", async (c) => {
  try {
    const data = await c.req.json();
    const id = `inquiry-${Date.now()}`;
    
    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const inquiry = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: data.status || 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`inquiry:${id}`, inquiry);
    
    console.log('New inquiry created:', { id, name: data.name, email: data.email });
    
    return c.json({ success: true, inquiry }, 201);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return c.json({ error: 'Failed to create inquiry', details: String(error) }, 500);
  }
});

// Update inquiry status
app.put("/make-server-2a57c5c9/inquiries/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    
    const existing = await kv.get(`inquiry:${id}`);
    if (!existing) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }
    
    const updated = {
      ...existing,
      ...data,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`inquiry:${id}`, updated);
    
    return c.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return c.json({ error: 'Failed to update inquiry', details: String(error) }, 500);
  }
});

// Delete inquiry
app.delete("/make-server-2a57c5c9/inquiries/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    const existing = await kv.get(`inquiry:${id}`);
    if (!existing) {
      return c.json({ error: 'Inquiry not found' }, 404);
    }
    
    await kv.del(`inquiry:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return c.json({ error: 'Failed to delete inquiry', details: String(error) }, 500);
  }
});

// SEO Settings endpoints

// Get SEO settings
app.get("/make-server-2a57c5c9/seo-settings", async (c) => {
  try {
    const settings = await kv.get('seo:settings');
    return c.json({ settings: settings || null });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return c.json({ error: 'Failed to fetch SEO settings' }, 500);
  }
});

// Save SEO settings
app.post("/make-server-2a57c5c9/seo-settings", async (c) => {
  try {
    const data = await c.req.json();
    
    const settings = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set('seo:settings', settings);
    
    return c.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving SEO settings:', error);
    return c.json({ error: 'Failed to save SEO settings', details: String(error) }, 500);
  }
});

// Get all page SEO settings
app.get("/make-server-2a57c5c9/seo-settings/pages", async (c) => {
  try {
    const pages = await kv.getByPrefix('seo:page:');
    return c.json({ pages: pages || [] });
  } catch (error) {
    console.error('Error fetching page SEO settings:', error);
    return c.json({ error: 'Failed to fetch page SEO settings' }, 500);
  }
});

// Get specific page SEO settings
app.get("/make-server-2a57c5c9/seo-settings/pages/:pageId", async (c) => {
  try {
    const pageId = c.req.param('pageId');
    const settings = await kv.get(`seo:page:${pageId}`);
    return c.json({ settings: settings || null });
  } catch (error) {
    console.error('Error fetching page SEO settings:', error);
    return c.json({ error: 'Failed to fetch page SEO settings' }, 500);
  }
});

// Save specific page SEO settings
app.post("/make-server-2a57c5c9/seo-settings/pages/:pageId", async (c) => {
  try {
    const pageId = c.req.param('pageId');
    const data = await c.req.json();
    
    const settings = {
      ...data,
      pageId,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`seo:page:${pageId}`, settings);
    
    return c.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving page SEO settings:', error);
    return c.json({ error: 'Failed to save page SEO settings', details: String(error) }, 500);
  }
});

// Get global SEO settings (schema, sitemap, robots)
app.get("/make-server-2a57c5c9/seo-settings/global", async (c) => {
  try {
    const settings = await kv.get('seo:global');
    return c.json({ settings: settings || null });
  } catch (error) {
    console.error('Error fetching global SEO settings:', error);
    return c.json({ error: 'Failed to fetch global SEO settings' }, 500);
  }
});

// Save global SEO settings
app.post("/make-server-2a57c5c9/seo-settings/global", async (c) => {
  try {
    const data = await c.req.json();
    
    const settings = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set('seo:global', settings);
    
    return c.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving global SEO settings:', error);
    return c.json({ error: 'Failed to save global SEO settings', details: String(error) }, 500);
  }
});

// Clean up container style from custom head code
app.post("/make-server-2a57c5c9/seo-settings/clean-container", async (c) => {
  try {
    console.log('🧹 Starting cleanup of #container style...');
    
    // Get current settings
    const settings = await kv.get('seo:global');
    if (!settings) {
      console.log('⚠️ No global SEO settings found');
      return c.json({ success: true, message: 'No settings to clean', removed: false });
    }

    let customHeadCode = settings.customHeadCode || '';
    const originalCode = customHeadCode;

    // Remove #container style
    if (customHeadCode.includes('#container') && customHeadCode.includes('display: none')) {
      console.log('❌ Found #container style, removing...');
      
      // Remove the style tag containing #container
      customHeadCode = customHeadCode.replace(/<style[^>]*>[\s\S]*?#container[\s\S]*?display:\s*none[\s\S]*?<\/style>/gi, '');
      
      // Remove noscript tag containing #container style
      customHeadCode = customHeadCode.replace(/<noscript[^>]*>[\s\S]*?#container[\s\S]*?display:\s*none[\s\S]*?<\/noscript>/gi, '');
      
      customHeadCode = customHeadCode.trim();

      // Update settings
      const updatedSettings = {
        ...settings,
        customHeadCode,
        updatedAt: new Date().toISOString()
      };

      await kv.set('seo:global', updatedSettings);
      
      console.log('✅ #container style removed successfully');
      return c.json({ 
        success: true, 
        message: '#container style removed successfully',
        removed: true,
        before: originalCode,
        after: customHeadCode
      });
    } else {
      console.log('ℹ️ No #container style found');
      return c.json({ 
        success: true, 
        message: 'No #container style found',
        removed: false
      });
    }
  } catch (error) {
    console.error('❌ Error cleaning container style:', error);
    return c.json({ error: 'Failed to clean container style', details: String(error) }, 500);
  }
});

// Shorten long English descriptions in global SEO settings
app.post("/make-server-2a57c5c9/seo-settings/shorten-descriptions", async (c) => {
  try {
    console.log('✂️ Starting to shorten long English descriptions...');
    
    // Get current settings
    const settings = await kv.get('seo:global');
    if (!settings) {
      console.log('⚠️ No global SEO settings found');
      return c.json({ success: true, message: 'No settings to update', updated: false });
    }

    let updated = false;
    const changes: string[] = [];

    // Check and shorten descriptionEn
    if (settings.descriptionEn && settings.descriptionEn.includes('Manage and customize icons')) {
      const oldValue = settings.descriptionEn;
      settings.descriptionEn = 'IT consulting, MVP development, AI development, and UX/UI planning services';
      changes.push(`Description EN: "${oldValue}" → "${settings.descriptionEn}"`);
      updated = true;
    }

    // Check and shorten ogDescriptionEn
    if (settings.ogDescriptionEn && settings.ogDescriptionEn.includes('Manage and customize icons')) {
      const oldValue = settings.ogDescriptionEn;
      settings.ogDescriptionEn = 'IT consulting, MVP development, AI development, and UX/UI planning services';
      changes.push(`OG Description EN: "${oldValue}" → "${settings.ogDescriptionEn}"`);
      updated = true;
    }

    if (updated) {
      const updatedSettings = {
        ...settings,
        updatedAt: new Date().toISOString()
      };

      await kv.set('seo:global', updatedSettings);
      
      console.log('✅ Descriptions shortened successfully');
      return c.json({ 
        success: true, 
        message: 'Descriptions shortened successfully',
        updated: true,
        changes
      });
    } else {
      console.log('ℹ️ No long descriptions found');
      return c.json({ 
        success: true, 
        message: 'No long descriptions found',
        updated: false
      });
    }
  } catch (error) {
    console.error('❌ Error shortening descriptions:', error);
    return c.json({ error: 'Failed to shorten descriptions', details: String(error) }, 500);
  }
});

// Serve robots.txt
app.get("/robots.txt", (c) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.potenlab.dev/sitemap.xml`;
  
  return c.text(robotsTxt, 200, {
    'Content-Type': 'text/plain'
  });
});

// Add a prefixed version as well for edge function routing
app.get("/make-server-2a57c5c9/robots.txt", (c) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://www.potenlab.dev/sitemap.xml`;
  
  return c.text(robotsTxt, 200, {
    'Content-Type': 'text/plain'
  });
});

// Serve Naver site verification HTML (for verification page crawling)
app.get("/naver0ed4334c54a63c176e5e0d31611686362999c40b.html", (c) => {
  return c.html(`naver-site-verification: 0ed4334c54a63c176e5e0d31611686362999c40b`);
});

// DO NOT serve root "/" from server - this conflicts with the React app
// The React app itself will serve "/" and include meta tags

// Serve sitemap.xml (basic version)
app.get("/sitemap.xml", (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.potenlab.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/contents</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>`;
  
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml'
  });
});

// Add a prefixed version as well for edge function routing
app.get("/make-server-2a57c5c9/sitemap.xml", (c) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.potenlab.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/contents</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.potenlab.dev/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
  </url>
</urlset>`;
  
  return c.text(sitemap, 200, {
    'Content-Type': 'application/xml'
  });
});

console.log('🚀 Potenlab Server starting...');

// Initialize storage bucket on startup
(async () => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    );
    
    const bucketName = 'make-2a57c5c9-portfolios';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log('Creating storage bucket:', bucketName);
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      });
      if (error) {
        // Ignore "already exists" error (can happen in race conditions or restarts)
        if (!error.message?.includes('already exists')) {
          console.error('Failed to create bucket:', error);
        } else {
          console.log('Storage bucket already exists (race condition):', bucketName);
        }
      } else {
        console.log('Storage bucket created successfully');
      }
    } else {
      console.log('Storage bucket already exists:', bucketName);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
})();

// Translation endpoint using Google Cloud Translation API
app.post("/make-server-2a57c5c9/translate", async (c) => {
  try {
    const { text, sourceLang, targetLang } = await c.req.json();
    
    if (!text || !sourceLang || !targetLang) {
      return c.json({ error: 'Missing required fields: text, sourceLang, targetLang' }, 400);
    }

    const apiKey = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');
    if (!apiKey) {
      console.warn('⚠️ GOOGLE_TRANSLATE_API_KEY not set - returning original text');
      // Return original text if API key is not configured
      return c.json({ translatedText: text, warning: 'Translation service not configured' });
    }

    // Call Google Cloud Translation API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'html' // Preserve HTML formatting
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('⚠️ Google Translate API error - returning original text:', errorText);
      // Return original text if translation fails
      return c.json({ translatedText: text, warning: 'Translation failed, using original text' });
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    return c.json({ translatedText });
  } catch (error) {
    console.warn('⚠️ Error in translation endpoint - returning original text:', error);
    // Return original text if any error occurs
    return c.json({ translatedText: text || '', warning: 'Translation error, using original text' });
  }
});

Deno.serve(app.fetch);