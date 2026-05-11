import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

interface Aduan {
  id: string;
  title: string;
  description: string;
}

const router = Router();
const aduans = new Map<string, Aduan>();

const getRouteId = (req: Request): string | null => {
  const id = req.params.id;
  return typeof id === 'string' && id.trim() !== '' ? id : null;
};

router.post('/create', (req: Request, res: Response) => {
  const { title, description } = req.body as Partial<Aduan>;

  if (!title || !description) {
    return res.status(400).json({
      message: 'Both title and description are required.',
    });
  }

  const id = String(Date.now());
  const aduan: Aduan = { id, title, description };
  aduans.set(id, aduan);

  return res.status(201).json({ message: 'Aduan created.', data: aduan });
});

router.get('/view/:id', (req: Request, res: Response) => {
  const id = getRouteId(req);

  if (!id) {
    return res.status(400).json({ message: 'Invalid id parameter.' });
  }

  const aduan = aduans.get(id);

  if (!aduan) {
    return res.status(404).json({ message: 'Aduan not found.' });
  }

  return res.json({ data: aduan });
});

router.put('/update/:id', (req: Request, res: Response) => {
  const id = getRouteId(req);

  if (!id) {
    return res.status(400).json({ message: 'Invalid id parameter.' });
  }

  const existing = aduans.get(id);

  if (!existing) {
    return res.status(404).json({ message: 'Aduan not found.' });
  }

  const { title, description } = req.body as Partial<Aduan>;

  if (!title && !description) {
    return res.status(400).json({
      message: 'At least one of title or description is required to update.',
    });
  }

  const updated: Aduan = {
    ...existing,
    title: title ?? existing.title,
    description: description ?? existing.description,
  };

  aduans.set(id, updated);
  return res.json({ message: 'Aduan updated.', data: updated });
});

router.delete('/delete/:id', (req: Request, res: Response) => {
  const id = getRouteId(req);

  if (!id) {
    return res.status(400).json({ message: 'Invalid id parameter.' });
  }

  const exists = aduans.has(id);

  if (!exists) {
    return res.status(404).json({ message: 'Aduan not found.' });
  }

  aduans.delete(id);
  return res.json({ message: 'Aduan deleted.' });
});

export default router;
