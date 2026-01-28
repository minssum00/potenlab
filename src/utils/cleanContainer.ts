// Utility to clean #container style from custom head code
import { projectId, publicAnonKey } from './supabase/info';

export async function cleanContainerStyle(): Promise<{
  success: boolean;
  message: string;
  removed: boolean;
}> {
  try {
    console.log('🧹 Cleaning #container style from custom head code...');
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-2a57c5c9/seo-settings/clean-container`,
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
    console.log('✅ Clean container response:', data);
    
    return {
      success: data.success,
      message: data.message,
      removed: data.removed
    };
  } catch (error) {
    console.error('❌ Failed to clean container style:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      removed: false
    };
  }
}

// Auto-run on import (only in development)
if (typeof window !== 'undefined') {
  // IMMEDIATELY remove any noscript or style tags with #container on page load
  // This runs before React hydration
  const cleanImmediately = () => {
    // Remove all noscript tags that contain #container style
    const noscriptTags = document.querySelectorAll('noscript');
    noscriptTags.forEach(tag => {
      const content = tag.textContent || '';
      if (content.includes('#container') && content.includes('display') && content.includes('none')) {
        console.log('🚫 BLOCKED: Removed noscript #container style');
        tag.remove();
      }
    });

    // For style tags, only remove the #container rule, not the entire tag
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(tag => {
      const content = tag.textContent || '';
      if (content.includes('#container') && content.includes('display') && content.includes('none')) {
        // Only remove if it's ONLY the container style, otherwise just remove that rule
        const lines = content.split('\n').filter(line => 
          !(line.includes('#container') && line.includes('display') && line.includes('none'))
        );
        
        if (lines.length === 0 || lines.every(line => line.trim() === '')) {
          // If nothing left, remove the tag
          console.log('🚫 BLOCKED: Removed style tag with only #container');
          tag.remove();
        } else {
          // Keep the tag but remove the #container rule
          tag.textContent = lines.join('\n');
          console.log('🚫 BLOCKED: Removed #container rule from style tag');
        }
      }
    });
  };

  // Run immediately
  cleanImmediately();

  // Also run on DOMContentLoaded in case any are added later
  document.addEventListener('DOMContentLoaded', cleanImmediately);

  // Run the server cleanup as well (but don't wait for it)
  cleanContainerStyle().then(result => {
    if (result.removed) {
      console.log('🎉 #container style has been removed from server! Please refresh the page.');
    } else if (result.success) {
      console.log('ℹ️ No #container style found on server.');
    }
  }).catch(error => {
    // Silently ignore server cleanup errors - the immediate cleanup above is enough
    console.log('ℹ️ Server cleanup skipped (not critical)');
  });
}