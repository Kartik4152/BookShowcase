import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as admin from "firebase-admin";

// initialize environment variables
dotenv.config();

// setting the port
const port = process.env.PORT || 8080;

// initializing firebase-admin
admin.initializeApp({
  credential: admin.credential.cert(
{
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.CLIENT_CERT_URL
} as admin.ServiceAccount),
});

// initialize express server
const app = express();
app.use(cors({ origin: "*" }));

interface IBook {
  title: string;
  year: number;
  description: string;
  image: string;
  id?: string;
}

// route handler for the books route
app.get("/books", async (req, res) => {
  let books: IBook[];
  try {
    books = (await admin.firestore().collection("books").get()).docs.map(
      (doc): IBook => {
        const bk = doc.data() as IBook;
        return {
          ...bk,
          id: doc.id,
        };
      }
    );
  } catch (err) {
    return res.json(err);
  }
  return res.json(books);
});

// route handler for the books/:id route
app.get("/books/:id", async (req, res) => {
  const id: string = req.params.id;
  let book: IBook;
  try {
    book = (
      await admin.firestore().collection("books").doc(id).get()
    ).data() as IBook;
    book.id = id;
  } catch (err) {
    return res.json(err);
  }
  return res.json(book);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});

// exporting app for test purposes
export default app;
