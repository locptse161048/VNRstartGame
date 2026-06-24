// Vercel Serverless Function — bảng xếp hạng "Bản hùng ca Điện Biên"
// GET  /api/scores       -> trả top 100 điểm (giảm dần)
// POST /api/scores {name,score,rank} -> lưu 1 điểm
//
// Cần đặt biến môi trường trên Vercel:
//   MONGODB_URI  = connection string của MongoDB Atlas (Settings -> Environment Variables)
//   MONGODB_DB   = (tuỳ chọn) tên database, mặc định "dienbien"
//
// KHÔNG hard-code connection string vào file này.

const { MongoClient } = require('mongodb');

const uri   = process.env.MONGODB_URI;
const DBNAME = process.env.MONGODB_DB || 'dienbien';
const COLL  = 'leaderboard';

// Tái sử dụng kết nối giữa các lần gọi (quan trọng cho serverless)
let cached = global._mongo;
if (!cached) cached = global._mongo = { promise: null };

async function getCollection() {
  if (!cached.promise) {
    cached.promise = new MongoClient(uri, { maxPoolSize: 5 }).connect();
  }
  const client = await cached.promise;
  return client.db(DBNAME).collection(COLL);
}

module.exports = async (req, res) => {
  try {
    if (!uri) {
      res.status(500).json({ error: 'Thiếu biến môi trường MONGODB_URI' });
      return;
    }
    const coll = await getCollection();

    if (req.method === 'GET') {
      const rows = await coll
        .find({}, { projection: { _id: 0, name: 1, score: 1, rank: 1, createdAt: 1 } })
        .sort({ score: -1 })
        .limit(100)
        .toArray();
      res.setHeader('Cache-Control', 'no-store');
      res.status(200).json(rows);
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};
      const name  = String(body.name || 'Ẩn danh').slice(0, 16);
      const score = Math.max(0, Math.min(1e9, parseInt(body.score, 10) || 0));
      const rank  = ['S', 'A', 'B', 'C'].includes(body.rank) ? body.rank : 'C';
      await coll.insertOne({ name, score, rank, createdAt: new Date() });
      res.status(201).json({ ok: true });
      return;
    }

    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
