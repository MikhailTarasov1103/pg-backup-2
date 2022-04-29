import { expect } from 'chai';
import { config, validateConfig } from '../src/services/config';

describe("ConfigTest", () => {

    beforeEach(async () => {
        config.LOCALLY_BACKUP_FILES_COUNT_MAX = 5;
        config.S3_ACCESS_KEY_ID = 'test';
        config.S3_SECRET_ACCESS_KEY = 'test';
        config.S3_BUCKET = 'test';
        config.S3_ENDPOINT_URL = 'test';
        config.S3_REGION = 'test';
        config.TEST_SQL_QUERY = 'SELECT COUNT(*) FROM users';
        config.PG_HOST = 'test';
        config.PG_DB = 'test';
        config.PG_USER = 'test';
        config.PG_PASSWORD = 'test';
        config.PG_PORT = 'test';
        config.LOCALLY_BACKUP_CRON = '*/10 * * * * *';
        config.S3_BACKUP_CRON = '*/10 * * * * *';
    });

    it('should be valid config', () => {
        const configValidation = validateConfig();
        expect(configValidation).to.deep.equal(undefined);
    });

    it('should be valid config without s3 backup', () => {
        config.S3_BACKUP_CRON = '';
        config.S3_ACCESS_KEY_ID = '';
        config.S3_SECRET_ACCESS_KEY = '';
        config.S3_BUCKET = '';
        config.S3_ENDPOINT_URL = '';

        const configValidation = validateConfig();
        expect(configValidation).to.deep.equal(undefined);
    });

    it('should be valid config without TEST_SQL_QUERY', () => {
        config.TEST_SQL_QUERY = '';
        const configValidation = validateConfig();
        expect(configValidation).to.deep.equal(undefined);
    });

    it('should be error for LOCALLY_BACKUP_FILES_COUNT_MAX', () => {
        config.LOCALLY_BACKUP_FILES_COUNT_MAX = 0;
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "LOCALLY_BACKUP_FILES_COUNT_MAX", should be >0');
        }
    });

    it('should be error for LOCALLY_BACKUP_CRON', () => {
        config.LOCALLY_BACKUP_CRON = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "LOCALLY_BACKUP_CRON"');
        }
    });

    it('should be error for PG_HOST', () => {
        config.PG_HOST = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "PG_HOST"');
        }
    });

    it('should be error for PG_DB', () => {
        config.PG_DB = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "PG_DB"');
        }
    });

    it('should be error for PG_USER', () => {
        config.PG_USER = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "PG_USER"');
        }
    });

    it('should be error for PG_PASSWORD', () => {
        config.PG_PASSWORD = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "PG_PASSWORD"');
        }
    });

    it('should be error for PG_PORT', () => {
        config.PG_PORT = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "PG_PORT"');
        }
    });

    it('should be error for S3_ACCESS_KEY_ID', () => {
        config.S3_ACCESS_KEY_ID = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "access key Id"');
        }
    });

    it('should be error for S3_SECRET_ACCESS_KEY', () => {
        config.S3_SECRET_ACCESS_KEY = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "secret access key"');
        }
    });

    it('should be error for S3_BUCKET', () => {
        config.S3_BUCKET = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "bucket name"');
        }
    });

    it('should be error for S3_ENDPOINT_URL', () => {
        config.S3_ENDPOINT_URL = '';
        try {
            const configValidation = validateConfig();
            expect(true).to.deep.equal(false);
        } catch (e) {
            expect(e).to.deep.equal('Please check "endpoint url"');
        }
    });
});