import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

interface Aduan {
  id: string;
  title: string;
  description: string;
}

const router = Router();

const aduans = new Map();
aduans.set('1', {
  nama_pengadu: 'John Doe',
  catatan: 'Catatan aduan 1',
  kategori_aduan: 'Kategori 1',
  email: 'john.doe@example.com',
});
aduans.set('2', {
  nama_pengadu: 'Jane Doe',
  catatan: 'Catatan aduan 2',
  kategori_aduan: 'Kategori 2',
  email: 'jane.doe@example.com',
});

const getRouteId = (req: Request): string | null => {
  const id = req.params.id;
  return typeof id === 'string' && id.trim() !== '' ? id : null;
};

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: Array.from(aduans.values()),
  });
});

router.post('/create', (req, res) => {
  // body params
  /**
   * 1. Nama Pengadu
   * 2. catatan
   * 3. categori aduan
   * 4. email
   *
   * // validasi - DONE
   */

  const { nama_pengadu, catatan, kategori_aduan, email } = req.body;

  // validation / validasi
  if (!nama_pengadu || !catatan || !kategori_aduan || !email) {
    return res.status(400).json({
      message:
        'All fields (nama_pengadu, catatan, kategori_aduan, email) are required.',
    });
  }

  const id = String(Date.now()); // - create a unique id, we are using date, but we will change to uuid
  const aduan = { nama_pengadu, catatan, kategori_aduan, email };
  aduans.set(id, aduan); // -- add new record

  return res
    .status(201)
    .json({ message: 'Aduan created.', data: { id: id, ...aduan } });
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
