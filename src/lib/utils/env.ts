/**
 * Environment variable validation utility
 * Ensures all required environment variables are present and valid
 */

interface EnvConfig {
  DATABASE_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASSWORD: string;
  SMTP_FROM: string;
  NEXT_PUBLIC_BASE_URL: string;
  NODE_ENV: string;
}

/**
 * Validates that all required environment variables are set
 * Throws an error if any required variable is missing
 */
export function validateEnv(): EnvConfig {
  const required = [
    'DATABASE_URL',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',
    'NEXT_PUBLIC_BASE_URL',
  ];

  const missing: string[] = [];

  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.\n' +
      'See .env.example for reference.'
    );
  }

  return {
    DATABASE_URL: process.env.DATABASE_URL!,
    SMTP_HOST: process.env.SMTP_HOST!,
    SMTP_PORT: process.env.SMTP_PORT!,
    SMTP_USER: process.env.SMTP_USER!,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD!,
    SMTP_FROM: process.env.SMTP_FROM!,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

/**
 * Validates SMTP credentials format
 */
export function validateSmtpConfig(config: EnvConfig): boolean {
  // Check SMTP port is a valid number
  const port = parseInt(config.SMTP_PORT, 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('SMTP_PORT must be a valid port number (1-65535)');
  }

  // Check email format for SMTP_USER and SMTP_FROM
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(config.SMTP_USER)) {
    throw new Error('SMTP_USER must be a valid email address');
  }
  if (!emailRegex.test(config.SMTP_FROM)) {
    throw new Error('SMTP_FROM must be a valid email address');
  }

  return true;
}

/**
 * Validates database connection string format
 */
export function validateDatabaseUrl(url: string): boolean {
  if (!url.startsWith('postgresql://') && !url.startsWith('postgres://')) {
    throw new Error('DATABASE_URL must be a valid PostgreSQL connection string');
  }
  return true;
}

/**
 * Gets validated environment configuration
 * Call this at application startup to ensure all required variables are present
 */
export function getEnvConfig(): EnvConfig {
  const config = validateEnv();
  validateSmtpConfig(config);
  validateDatabaseUrl(config.DATABASE_URL);
  return config;
}
