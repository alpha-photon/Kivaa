import { Router } from "express";
const router = Router();
import  {upload}  from "../middleware/multer.js";

import { getAllProducts, Create, getSingleProduct, deleteProduct, updateProduct, getQuery } from "../controllers/products.js";
//What to show when some one gose to "/" i.e home page
//*post routes
 router.route("/create").post(Create, upload.fields([{ name: "image" }]));
 router.post("/create", upload.single("image"), Create);

router.route("/get").get(getAllProducts);
router.route("/").get(getQuery);

//*get routes
router.route("/get/:id").get(getSingleProduct);
//*delete routes
router.route("/delete/:id").delete(deleteProduct);
//*put routes
router.route("/update/:id").put(updateProduct);

export default router;
