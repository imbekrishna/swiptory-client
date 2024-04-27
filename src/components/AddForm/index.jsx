import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import api from "../../api/api_instance";
import closeIcon from "../../assets/form_close.svg";
import caretDown from "../../assets/caret_down.svg";
import { ModalContext } from "../../contexts/ModalContext";
import styles from "./styles.module.css";
import Menu from "../DropDown";

import Slide from "./Slide";
import clsx from "clsx";

const categories = [
  {
    _id: "FOOD",
    name: "Food",
    __v: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=500",
  },
  {
    _id: "HEALTH",
    name: "Health and Fitness",
    __v: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=500",
  },
  {
    _id: "TRAVEL",
    name: "Travel",
    __v: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=500",
  },
  {
    _id: "MOVIES",
    name: "Movies",
    __v: 0,
    imageUrl: "https://images.unsplash.com/photo-1543536448-1e76fc2795bf?w=500",
  },
  {
    _id: "EDUCATION",
    name: "Education",
    __v: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500",
  },
];

const AddForm = () => {
  const newSlide = {
    heading: "",
    description: "",
    imageUrl: "",
  };

  // const { categories } = useContext(FilterContext);
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
      setSelectedCategory(addModal.data?.category);
    }
  }, [addModal.data]);

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
    setSlides(Array.from({ length: 3 }, () => newSlide));
    toggleAddModal();
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
          // TODO: Should reload page on update?
          await api.put(`/api/story/${addModal.data._id}`, {
            category: selectedCategory._id,
            slides,
          });
        } else {
          await api.post("/api/story", { category: selectedCategory, slides });
        }
        closeForm();
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
    <article className={styles.wrapper}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img
          src={closeIcon}
          alt=""
          onClick={() => console.log("closed")}
          role="button"
        />
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
          <form className={styles.modalForm}>
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
