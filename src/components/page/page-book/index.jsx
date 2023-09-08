import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookInfo } from "../../book-info";
import { CommentList } from "../../comment-list";
import { Modal } from "../../modal";
import { jumpToASpecificBook } from "../../../redux/slices/booksSlice";
import { userSelector } from "../../../redux/selectors";
import styles from "./index.module.css";

export const BookPage = () => {
  const { id } = useParams();
  const user = useSelector(userSelector);
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    jumpToASpecificBook(setBook, id);
  }, []);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  if (!book) {
    return null;
  }

  return (
    <>
      <div className={styles.WpBookPage}>
        <div className={styles.PageCard}>
          <img className={styles.ImgPage} src={book.imageUrl} />
          <BookInfo styles={styles} book={book} openModal={openModal} id={id} />
        </div>
        <div className={styles.PageReview}>
          <CommentList id={id} styles={styles} user={user} />
        </div>
        {isModalOpen && (
          <Modal styles={styles} book={book} closeModal={closeModal} />
        )}
      </div>
    </>
  );
};

