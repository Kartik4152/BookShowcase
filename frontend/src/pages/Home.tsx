import { useState, useEffect } from "react";
import axios from "axios";
import IBook from "../interfaces/book";
import { useHistory } from "react-router-dom";
import "./Home.scss";
import { PropagateLoader } from "react-spinners";

type CardProps = {
  title: string;
  image: string;
  id: string;
  year: number;
  description: string;
};
const Card = ({
  title,
  image,
  id,
  year,
  description,
}: CardProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push(`/book/${id}`)}>
      <div className="card__image">
        <div className="loader" style={{ display: loading ? "flex" : "none" }}>
          <PropagateLoader
            loading={true}
            size={8}
            speedMultiplier={3}
            color="white"
          />
        </div>
        <img
          src={image}
          alt="book cover"
          onLoad={() => setLoading(false)}
          style={{ display: loading ? "none" : "block" }}
        />
      </div>
      <div className="card__details">
        <div className="card__details-title">{title}</div>
        <div className="card__details-year">{year}</div>
      </div>
    </div>
  );
};

const Home = (): JSX.Element => {
  const [books, setBooks] = useState<IBook[]>([]);
  console.log(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    (async () => {
      let data: IBook[];
      try {
        data = (
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books`)
        ).data;
      } catch (err) {
        console.log(err);
        return;
      }
      setBooks(data);
    })();
  }, []);
  return (
    <div className="container">
      <div className="title">Book Catalogue</div>
      <div className="booklist" data-testid="book-list">
        {books.map((book: IBook): JSX.Element => {
          return <Card key={book.id} {...book} />;
        })}
      </div>
    </div>
  );
};

export default Home;
