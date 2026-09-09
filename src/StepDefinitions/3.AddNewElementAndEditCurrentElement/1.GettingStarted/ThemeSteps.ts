import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import fs = require('fs');
import path = require('path');
import dotenv from 'dotenv';

if(!process.env.CI) {
  dotenv.config();
}


