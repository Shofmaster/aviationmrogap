import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');

const tmpDir = mkdtempSync(path.join(tmpdir(), 'aviation-progress-'));
const outFile = path.join(tmpDir, 'assessmentProgress.mjs');

try {
  await esbuild.build({
    entryPoints: [path.resolve('src/utils/assessmentProgress.ts')],
    outfile: outFile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    sourcemap: false,
  });

  const mod = await import(pathToFileURL(outFile).href);
  const { calculateSectionCompletion } = mod;

  // Section 10: with certifications => auditSurveillance path (no lastFAASurveillance required)
  assert.equal(
    calculateSectionCompletion(
      {
        certifications: ['FAA Part 145', 'EASA Part 145'],
        auditSurveillance: {
          'FAA Part 145': 'Within 3 months',
          'EASA Part 145': '3-6 months ago',
        },
        auditFindingsCount: 'None',
        findingSeverity: 'N/A',
        recurringFindings: 'No',
        findingClosureStatus: 'All Closed',
        certificateActions: ['None'],
        auditHistory: 'None',
        upcomingAudits: 'None',
      },
      10
    ),
    1
  );

  // Section 10: no certifications => lastFAASurveillance path (no auditSurveillance required)
  assert.equal(
    calculateSectionCompletion(
      {
        certifications: [],
        lastFAASurveillance: 'Within 3 months',
        auditFindingsCount: 'None',
        findingSeverity: 'N/A',
        recurringFindings: 'No',
        findingClosureStatus: 'All Closed',
        certificateActions: ['None'],
        auditHistory: 'None',
        upcomingAudits: 'None',
      },
      10
    ),
    1
  );

  // Section 1: optional fields only required if relevant certs selected
  assert.equal(
    calculateSectionCompletion({ certifications: ['FAA Part 145'] }, 1),
    1
  );
  assert.equal(
    calculateSectionCompletion({ certifications: ['AS9100'], as9100Rev: 'Rev D' }, 1),
    1
  );

  // Section 5: error frequency only required if toolControlErrors === "Yes"
  assert.equal(
    calculateSectionCompletion(
      {
        qualityMethodologies: ['None'],
        continuousImprovementActive: 'No',
        toolControlMethod: 'Shadow Boards',
        toolControlDescription: 'Shadow boards for all shared tooling.',
        toolControlErrors: 'No',
      },
      5
    ),
    1
  );

  // Section 6: SMS details not required if hasSMS is "No"
  assert.equal(
    calculateSectionCompletion({ hasSMS: 'No', challenges: ['None'] }, 6),
    1
  );

  console.log('Progress smoke tests passed.');
} finally {
  rmSync(tmpDir, { recursive: true, force: true });
}

