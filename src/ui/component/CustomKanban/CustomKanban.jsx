import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTasks } from "@/services/task/task.services";

export const CustomKanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        console.log("Response from getTasks:", response);

        const tasks = response.tasks.flatMap((category) =>
          category.items.map((task) => ({ ...task, column: category.title.toLowerCase() }))
        );
        setCards(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Must"
        column="must"
        headingColor="text-red-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Should"
        column="should"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Could"
        column="could"
        headingColor="text-green-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Won't"
        column="won't"
        headingColor="text-gray-400"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

const Column = ({ title, headingColor, cards, column, setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("sourceColumn", card.column);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    const targetColumn = column;

    if (sourceColumn !== targetColumn) {
      setCards((prevCards) => {
        const updatedCards = prevCards.map((card) =>
          card.id === cardId ? { ...card, column: targetColumn } : card
        );
        return updatedCards;
      });
    }

    setActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        {active && <DropIndicator />}
      </div>
    </div>
  );
};

const Card = ({ title, id, column, handleDragStart }) => {
  return (
    <motion.div
      layout
      layoutId={id}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { title, id, column })}
      className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
    >
      <p className="text-sm text-neutral-100">{title}</p>
    </motion.div>
  );
};

const DropIndicator = () => (
  <div className="h-[2px] w-full bg-neutral-400"></div>
);
