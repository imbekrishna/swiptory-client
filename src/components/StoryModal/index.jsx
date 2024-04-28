import clsx from "clsx";
import toast from "react-hot-toast";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Like from "./Like";
import Bookmark from "./Bookmark";

import closeIcon from "@assets/close.svg";
import nextIcon from "@assets/next.svg";
import prevIcon from "@assets/prev.svg";
import sendIcon from "@assets/send.svg";

import styles from "./styles.module.css";

const storyData = {
  _id: "66255eeec2315b0dc5928fd6",
  user: "66239f88b75cf73100f7a766",
  category: "TRAVEL",
  slides: [
    {
      heading: "A tale of travel",
      description: "description 1",
      imageUrl:
        "https://images.unsplash.com/photo-1712149851157-06131345e410?q=80&w=600",
    },
    {
      heading: "heading 2",
      description: "description 2",
      imageUrl:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=500",
    },
    {
      heading: "heading 3",
      description: "description 3",
      imageUrl:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=500",
    },
  ],
  likes: ["66239f88b75cf73100f7a766", "66200ad9698208d1c327f250"],
  createdAt: "2024-04-21T18:46:06.416Z",
  updatedAt: "2024-04-25T12:00:59.616Z",
  __v: 0,
  bookmarks: ["66239f88b75cf73100f7a766"],
};

const StoryModal = () => {
  const navigate = useNavigate();
  const indexRef = useRef(0); // remember slides index
  const divRef = useRef(null);

  const [index, setIndex] = useState(indexRef.current);

  const [story] = useState(storyData);

  const storyId = story._id;

  const liked = false; //story?.likes.includes(user?.id);
  const bookmarked = false; //story?.bookmarks.includes(user?.id);

  const toPrev = () => {
    indexRef.current = indexRef.current > 0 ? indexRef.current - 1 : 0;
    setIndex(indexRef.current);
    return indexRef.current;
  };

  const toNext = useCallback(() => {
    indexRef.current =
      indexRef.current < story?.slides.length - 1
        ? indexRef.current + 1
        : indexRef.current;
    setIndex(indexRef.current);
    return indexRef.current;
  }, [indexRef, story]);

  useEffect(() => {
    let timerId;

    if (story) {
      timerId = setInterval(() => {
        const val = toNext();
        if (val === story?.slides.length - 1) {
          clearInterval(timerId);
        }
      }, 3000);
    }
    return () => clearInterval(timerId);
  }, [toNext, story, index]);

  const handleClick = (e) => {
    const divWidth = divRef.current.getBoundingClientRect().width;

    const halfWidth = divWidth / 2;
    const mousePosition = e.nativeEvent.offsetX;

    if (mousePosition < halfWidth) {
      toPrev();
    } else {
      toNext();
    }
    e.stopPropagation();
  };

  const copyShareLink = (e) => {
    e.stopPropagation();

    const protocol = window.location.protocol;
    const host = window.location.host;

    const url = `${protocol}//${host}/story/${storyId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  const closeModal = (e) => {
    e.stopPropagation();
    navigate("/");
    // FIXME: Clear story state
  };

  const bgStyle = {
    background: `
      linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.09) 50%,
      rgba(0, 0, 0, 0.85) 75%
    ),
    url(${story?.slides[indexRef.current].imageUrl}) center/cover no-repeat
    `,
  };
  return (
    <article className={styles.wrapper}>
      <img
        className={styles.navBtn}
        src={prevIcon}
        alt=""
        role="button"
        onClick={toPrev}
      />
      <div
        ref={divRef}
        className={styles.content}
        style={bgStyle}
        onClick={handleClick}
      >
        <div className={styles.progressWrapper}>
          {story?.slides.map((_, i) => (
            <div key={`progress-${i}`} className={styles.progressBar}>
              <div
                className={clsx(
                  index == i && styles.meter,
                  index >= i && styles.visited
                )}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.navWrapper}>
          <img
            src={closeIcon}
            width="18px"
            height="18px"
            style={{ filter: "invert(100%)" }}
            alt=""
            role="button"
            onClick={closeModal}
          />
          <img
            src={sendIcon}
            width="24px"
            height="24px"
            alt=""
            role="button"
            onClick={copyShareLink}
          />
        </div>
        <div className={styles.slideDetail}>
          <h2 className="textTitle textLight">
            {story?.slides[index].heading}
          </h2>
          <p className={clsx(styles.description, "textLight")}>
            {story?.slides[index].description}
          </p>
        </div>
        <div className={styles.storyAction}>
          <Bookmark
            fillColor={bookmarked ? "blue" : "white"}
            handleClick={(e) => {
              e.stopPropagation();
              // bookmarkStory(user);
            }}
          />
          <div className={styles.likeDiv}>
            <Like
              fillColor={liked ? "red" : "white"}
              handleClick={(e) => {
                e.stopPropagation();
                // likeStory(user);
              }}
            />
            <span>{story?.likes.length}</span>
          </div>
        </div>
      </div>
      <img
        className={styles.navBtn}
        src={nextIcon}
        alt=""
        role="button"
        onClick={toNext}
      />
    </article>
  );
};
export default StoryModal;
