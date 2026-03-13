export default function handler(req, res) {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ 
      success: false, 
      message: "Admin password not configured in environment." 
    });
  }

  if (password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
}
