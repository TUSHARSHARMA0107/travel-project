// routes/message.routes.js

import express from
"express";




import verifyToken from "../utils/verifyToken.js";
import { getMessages, getUnreadCount, markMessageRead } from "../controller/message.controller.js";


const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getMessages
);

router.patch(
  "/:id/read",
  verifyToken,
  markMessageRead
);

router.get(
  "/unread-count",
  verifyToken,
  getUnreadCount
);

export default router;