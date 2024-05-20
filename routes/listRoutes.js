const express = require('express');
const multer = require('multer');
const { createList, addUsersToList, sendEmailToList, unsubscribeUser } = require('../controllers/listControllers');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/lists', createList);
router.post('/lists/:listId/users', upload.single('file'), addUsersToList);
router.post('/lists/:listId/send-email', sendEmailToList);
router.post('/lists/:listId/unsubscribe/:userId', unsubscribeUser);

module.exports = router;
