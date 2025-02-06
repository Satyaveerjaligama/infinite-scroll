import { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const generateArray = (startFrom) => {
    return Array.from({ length: 10 }, (_, index) => startFrom + index);
  };

  useEffect(() => {
    async function getInitialData() {
      setTimeout(() => {
        setItems(generateArray(1));
      }, 1000);
    }
    getInitialData();
  }, []);

  const getData = async () => {
    if (items.length < 60) {
      console.log("Fetching the data after", items.length);
      setTimeout(() => {
        setItems((prevItems) => [
          ...prevItems,
          ...generateArray(prevItems.length + 1),
        ]);
        setHasMore(true);
      }, 1000);
    } else {
      console.log("-----------No More Data to show----------");
      setHasMore(false);
    }
  };

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={items.length}
        next={getData}
        hasMore={hasMore}
        loader={<p>Loading....</p>}
      >
        {items.map((value, index) => (
          <div
            key={value + index}
            style={{
              height: "100px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: `${index % 2 === 0 ? "" : "lightblue"}`,
              marginBottom: "10px",
            }}
          >
            {value}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
