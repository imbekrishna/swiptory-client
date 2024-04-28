import styles from "./styles.module.css";

const story = {
  _id: "66255eeec2315b0dc5928fd6",
  user: "66239f88b75cf73100f7a766",
  category: "TRAVEL",
  slides: [
    {
      heading: "Heading comes here",
      description:
        "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
      imageUrl:
        "https://images.unsplash.com/photo-1712149851157-06131345e410?q=80&w=600",
    },
    {
      heading: "Heading comes here",
      description:
        "Inspirational designs, illustrations, and graphic elements from the world’s best designers.",
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

const Story = () => {
  const featureSlide = story?.slides[0];

  const bgStyle = {
    background: `
      linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.09) 50%,
      rgba(0, 0, 0, 0.85) 75%
    ),
    url(${featureSlide.imageUrl}) center/cover no-repeat
    `,
  };
  return (
    <div className={styles.wrapper} style={bgStyle}>
      <div className={styles.detail}>
        <h3>{featureSlide.heading}</h3>
        <p>{featureSlide.description}</p>
      </div>
    </div>
  );
};
export default Story;
