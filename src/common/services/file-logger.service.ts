import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService {
  private logBasePath: string;

  constructor() {
    this.logBasePath = path.resolve(
      __dirname,
      '..',
      '..',
      'logs',
    );
  }

  createLogDirectory(
    directoryName: string,
  ): string {
    const logDirectoryPath = path.join(
      this.logBasePath,
      directoryName,
    );

    if (!fs.existsSync(logDirectoryPath)) {
      fs.mkdirSync(logDirectoryPath, {
        recursive: true,
      });
    }
    return logDirectoryPath;
  }

  private ensureDirectoryExistence(
    directoryPath: string,
  ): void {
    const absoluteDirectoryPath = path.resolve(
      this.logBasePath,
      directoryPath,
    );
    if (!fs.existsSync(absoluteDirectoryPath)) {
      fs.mkdirSync(absoluteDirectoryPath, {
        recursive: true,
      });
    }
  }

  private getFilePath(
    directoryPath: string,
    fileName: string,
  ): string {
    const currentDate = new Date()
      .toISOString()
      .split('T')[0];
    const absoluteDirectoryPath = path.resolve(
      this.logBasePath,
      directoryPath,
      currentDate,
    );
    this.ensureDirectoryExistence(
      absoluteDirectoryPath,
    );
    return path.join(
      absoluteDirectoryPath,
      fileName,
    );
  }

  private writeLogToFile(
    filePath: string,
    logMessage: string,
  ): void {
    fs.appendFileSync(
      filePath,
      `${logMessage}\n`,
    );
  }

  log(
    logMessage: string,
    directoryPath: string,
    logFileName: string,
  ) {
    const logFilePath = path.join(
      directoryPath,
      logFileName,
    );
    fs.appendFileSync(
      logFilePath,
      `[${new Date().toISOString()}] ${logMessage}\n`,
    );
  }
}
