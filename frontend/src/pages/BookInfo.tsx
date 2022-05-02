import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IBook from "../interfaces/book";
import { PropagateLoader } from "react-spinners";
import "./BookInfo.scss";

const BookInfo = (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      let data: IBook;
      try {
        data = (
          await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/books/${id}`
          )
        ).data;
      } catch (err) {
        console.log(err);
        return;
      }
      setBook(data);
    })();
  }, [id]);
  return (
    <div className="bookinfoContainer">
      <div className="left"></div>
      <div className="book">
        <div className="book__image">
          <div
            className="loader"
            style={{ display: loading ? "flex" : "none" }}
          >
            <PropagateLoader
              loading={true}
              size={12}
              speedMultiplier={2}
              color="white"
            />
          </div>
          <img
            src={book?.image}
            alt="book cover"
            onLoad={() => setLoading(false)}
            style={{ display: loading ? "none" : "block" }}
          />
        </div>
        <div className="book__details">
          <div className="book__title">{book?.title}</div>
          <div className="book__year">{book?.year}</div>
          <div className="book__description">{book?.description}</div>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default BookInfo;
