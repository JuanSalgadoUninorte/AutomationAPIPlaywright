import { test as setup } from '@playwright/test';
import Logger from '../utils/Logger';

setup('Create a new database', async ({ request }) => {
    Logger.info("Before all tests --> Create a new database");
});