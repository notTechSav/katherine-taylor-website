/**
 * Content Generation API Routes
 * REST endpoints for AI-powered luxury content creation
 */

import { RequestHandler } from 'express';
import {
  generateServiceDescription,
  batchGenerateDescriptions,
  refreshContentSeasonal,
} from '../services/content-generator';

/**
 * POST /api/content/generate
 * Generate luxury service description
 * 
 * Body:
 * {
 *   serviceName: string;
 *   description?: string;
 *   duration?: string;
 *   price?: string;
 *   location?: string;
 *   highlights?: string[];
 *   targetKeywords?: string[];
 * }
 */
export const handleGenerateContent: RequestHandler = async (req, res) => {
  try {
    const serviceDetails = req.body;

    // Validation
    if (!serviceDetails.serviceName) {
      return res.status(400).json({
        error: 'serviceName is required',
      });
    }

    console.log(`Generating content for: ${serviceDetails.serviceName}`);

    const content = await generateServiceDescription(serviceDetails);

    res.json({
      success: true,
      data: content,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Content generation error:', error);
    res.status(500).json({
      error: 'Failed to generate content',
      message: error.message,
    });
  }
};

/**
 * POST /api/content/batch-generate
 * Generate descriptions for multiple services at once
 * 
 * Body:
 * {
 *   services: Array<ServiceDetails>
 * }
 */
export const handleBatchGenerate: RequestHandler = async (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        error: 'services array is required and must not be empty',
      });
    }

    if (services.length > 20) {
      return res.status(400).json({
        error: 'Maximum 20 services per batch request',
      });
    }

    console.log(`Batch generating content for ${services.length} services`);

    const results = await batchGenerateDescriptions(services);

    res.json({
      success: true,
      data: results,
      count: results.length,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Batch generation error:', error);
    res.status(500).json({
      error: 'Failed to generate batch content',
      message: error.message,
    });
  }
};

/**
 * POST /api/content/refresh-seasonal
 * Refresh existing content with seasonal angle
 * 
 * Body:
 * {
 *   service: ServiceDetails;
 *   season: string; // e.g., "Valentine's Day 2025"
 * }
 */
export const handleSeasonalRefresh: RequestHandler = async (req, res) => {
  try {
    const { service, season } = req.body;

    if (!service || !season) {
      return res.status(400).json({
        error: 'service and season are required',
      });
    }

    console.log(`Refreshing content for: ${service.serviceName} (${season})`);

    const refreshed = await refreshContentSeasonal(service, season);

    res.json({
      success: true,
      data: refreshed,
      season,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Seasonal refresh error:', error);
    res.status(500).json({
      error: 'Failed to refresh seasonal content',
      message: error.message,
    });
  }
};

/**
 * GET /api/content/health
 * Health check for content generation service
 */
export const handleHealthCheck: RequestHandler = (req, res) => {
  const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
  
  res.json({
    status: 'ok',
    service: 'content-generation',
    claudeConfigured: hasApiKey,
    timestamp: new Date().toISOString(),
  });
};

