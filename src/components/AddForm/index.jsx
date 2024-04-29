import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import api from "@api/api_instance";
import closeIcon from "@assets/form_close.svg";
import caretDown from "@assets/caret_down.svg";
import { ModalContext } from "@contexts/ModalContext";
import { CategoryContext } from "@contexts/CategoryContext";
import { UserContext } from "@contexts/UserContext";
import styles from "./styles.module.css";
import Menu from "@components/DropDown";

import Slide from "./Slide";
import clsx from "clsx";

const AddForm = () => {
  const newSlide = {
    heading: "",
    description: "",
    imageUrl: "",
  };

  const { updateKey } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);
  const { addModal, toggleAddModal } = useContext(ModalContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [slides, setSlides] = useState(
    Array.from({ length: 3 }, () => newSlide)
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (addModal.data) {
      setSlides(addModal.data?.slides);
      setSelectedCategory(
        categories.find((cat) => addModal.data?.category === cat._id)
      );
    }
  }, [addModal.data, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSlides((prevSlides) => {
      const allSlides = [...prevSlides];
      const currentSlide = { ...prevSlides[activeIndex] };
      currentSlide[name] = value;

      allSlides.splice(activeIndex, 1, currentSlide);

      return allSlides;
    });
  };

  const addSlide = () => {
    setSlides((prev) => {
      const nextSlide = prev.length;
      if (nextSlide < 6) {
        return [...prev, newSlide];
      } else {
        return prev;
      }
    });
  };

  const removeSlide = (slideIndex) => {
    setSlides((prev) => {
      if (prev.length === 3) {
        return prev;
      }
      const items = [...prev];
      items.splice(slideIndex, 1);
      return items;
    });
  };

  const prevSlide = () => {
    if (activeIndex == 0) {
      return;
    }

    setActiveIndex((prev) => prev - 1);
  };

  const nextSlide = () => {
    if (activeIndex == slides.length - 1) {
      return;
    }

    setActiveIndex((prev) => prev + 1);
  };

  const closeForm = () => {
    setActiveIndex(0);
    setSlides(Array.from({ length: 3 }, () => newSlide));
    toggleAddModal(null);
  };

  const slideIsInvalid = (slideData) => {
    // TODO: Strengthen validation
    const isInvalid = Object.values(slideData).some(
      (item) => item.length === 0
    );
    return isInvalid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const isValid = slides.every((slide) => !slideIsInvalid(slide));
      if (!isValid) {
        throw Error("All fields are required for all the slides");
      } else {
        if (addModal.type === "EDIT") {
          await api.put(`/api/story/${addModal.data._id}`, {
            category: selectedCategory._id,
            slides,
          });
        } else {
          await api.post("/api/story", { category: selectedCategory, slides });
        }
        closeForm();
        updateKey();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const data = error.response.data;
        setError(data);
      }
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <article
      style={{
        display: addModal.hidden ? "none" : "",
      }}
      className={styles.wrapper}
      onClick={closeForm}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={closeIcon} alt="" onClick={closeForm} role="button" />
        <h1>Add story to feed</h1>
        <small className={styles.limitMessage}>Add upto 6 slides</small>
        <div className={styles.formWrapper}>
          <div className={styles.slidesWrapper}>
            {slides?.map((_, i) => (
              <Slide
                key={`slide-${i}`}
                canClose={i > 2}
                active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                handleClose={() => removeSlide(i)}
              >
                Slide {i + 1}
              </Slide>
            ))}
            {slides?.length < 6 && (
              <>
                <Slide onClick={addSlide}>Add +</Slide>
              </>
            )}
          </div>
          <form
            className={styles.modalForm}
            onFocus={() => {
              setError(null);
            }}
          >
            <label htmlFor="heading">Heading: </label>
            <input
              type="text"
              placeholder="Your heading"
              id="heading"
              name="heading"
              value={slides[activeIndex].heading}
              onChange={handleChange}
            />
            <label htmlFor="description">Description: </label>
            <textarea
              rows="2"
              type="text"
              placeholder="Story Description"
              id="description"
              name="description"
              value={slides[activeIndex].description}
              onChange={handleChange}
            />
            <label htmlFor="imageUrl">Image: </label>
            <input
              type="text"
              placeholder="Add Image Url"
              id="imageUrl"
              name="imageUrl"
              value={slides[activeIndex].imageUrl}
              onChange={handleChange}
            />
            <label htmlFor="category">Category: </label>
            <Menu>
              <Menu.Button>
                <span className={clsx(!selectedCategory && "textMid")}>
                  {selectedCategory.name || "Category"}
                </span>
                <img src={caretDown} alt="" />
              </Menu.Button>
              <Menu.Dropdown>
                {categories?.map((category) => (
                  <Menu.Item
                    key={category._id}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </form>
        </div>
        <div>
          <p className="formError textCenter">{error ?? ""}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={clsx("bgTertiary", "textLight", styles.btnNav)}
            onClick={() => prevSlide()}
          >
            Previous
          </button>
          <button
            className={clsx("bgSecondary", "textLight", styles.btnNav)}
            onClick={() => nextSlide()}
          >
            Next
          </button>
          <button
            className="bgPrimary textLight"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Posting" : "Post"}
          </button>
        </div>
      </div>
    </article>
  );
};
export default AddForm;
