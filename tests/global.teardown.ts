import { test as teardown } from '@playwright/test';
import Logger from '../utils/Logger';

teardown('Delete the database', async ({ request }) => {
    Logger.info("After all tests --> Delete the database");
});