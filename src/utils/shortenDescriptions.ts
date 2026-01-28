// Utility to shorten long English descriptions in SEO settings
import { projectId, publicAnonKey } from './supabase/info';

export async function shortenDescriptions(): Promise<{
  success: boolean;
  message: string;
  updated: boolean;
  changes?: string[];
}> {
  try {
    console.log('✂️ Shortening long English descriptions...');
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/shorten-descriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Shorten descriptions response:', data);
    
    if (data.changes && data.changes.length > 0) {
      console.log('📝 Changes made:');
      data.changes.forEach((change: string) => console.log(`  - ${change}`));
    }
    
    return {
      success: data.success,
      message: data.message,
      updated: data.updated,
      changes: data.changes
    };
  } catch (error) {
    console.error('❌ Failed to shorten descriptions:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      updated: false
    };
  }
}

// Auto-run on import
if (typeof window !== 'undefined') {
  // Run once on page load
  shortenDescriptions().then(result => {
    if (result.updated) {
      console.log('🎉 Descriptions have been shortened! Changes:', result.changes);
    } else if (result.success) {
      console.log('ℹ️ No long descriptions found to shorten.');
    }
  });
}
