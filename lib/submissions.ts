import { promises as fs } from 'fs';
import path from 'path';

export type SubmissionType = 'contact' | 'quote' | 'careers';

export type StoredSubmission = {
  id: string;
  type: SubmissionType;
  createdAt: string;
  data: Record<string, string>;
  read: boolean;
};

const filePath = path.join(process.cwd(), 'data', 'submissions.json');

async function readAll(): Promise<StoredSubmission[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(items: StoredSubmission[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(items, null, 2));
}

export async function saveSubmission(type: SubmissionType, data: Record<string, string>) {
  const items = await readAll();
  const entry: StoredSubmission = {
    id: `${type}-${Date.now()}`,
    type,
    createdAt: new Date().toISOString(),
    data,
    read: false,
  };
  items.unshift(entry);
  await writeAll(items.slice(0, 500));
  return entry;
}

export async function listSubmissions() {
  return readAll();
}

export async function markSubmissionsRead() {
  const items = await readAll();
  await writeAll(items.map((item) => ({ ...item, read: true })));
}
