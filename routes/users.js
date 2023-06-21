var express = require("express");
var router = express.Router();

/* GET users listing. */

/**
 * @swagger
 * /users/test:
 *   get:
 *     description: Get list of FAC clinics
 *     tags: [clinic - find a service]
 *     responses:
 *
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FACClinic'
 */
router.get("/test", function (req, res) {
  res.send("respond with a resource");
});

module.exports = router;
