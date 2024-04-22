"use client";

import React, { useState } from "react";
import { Button, Divider, notification } from "antd";

import styles from "./page.module.css";
import { useCoinStore } from "../_lib/store";

function Garden() {
  const [api, contextColder] = notification.useNotification();
  const decreaseCoins = useCoinStore((state) => state.decreaseCoins);
  const coins = useCoinStore((state) => state.coins);
  const initialGrid = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null));
  const [grid, setGrid] = useState(initialGrid);

  const flowers = [
    { id: 1, name: "Rose", cost: 10, color: "#c0392b" },
    { id: 2, name: "Tulip", cost: 8, color: "#8e44ad" },
    { id: 3, name: "Sunflower", cost: 12, color: "#f1c40f" },
  ];

  const buyFlower = (flower) => {
    if (coins < flower.cost) {
      alert("Not enough coins!");
      return;
    }

    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === null) {
          emptyCells.push({ rowIndex, cellIndex });
        }
      });
    });

    if (emptyCells.length === 0) {
      alert("No free space in the garden!");
      api.error({
        message: `Not enough coins`,
        placement: "bottomRight",
      });
      return;
    }

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const updatedGrid = [...grid];
    updatedGrid[randomCell.rowIndex][randomCell.cellIndex] = {
      name: flower.name,
      color: flower.color,
    };

    setGrid(updatedGrid);
    decreaseCoins(flower.cost);
    api.success({
      message: `Flower purchased`,
      placement: "bottomRight",
    });
  };

  return (
    <div className={styles.app}>
      {contextColder}
      <div className={styles.store}>
        <h2>Flower Store</h2>
        <Divider />
        {flowers.map((flower) => (
          <Button
            key={flower.id}
            className={
              coins >= flower.cost ? styles.button : styles.disabledButton
            }
            onClick={() => buyFlower(flower)}
            disabled={coins < flower.cost}
          >
            Buy {flower.name} ({flower.cost} Coins)
          </Button>
        ))}
      </div>
      <div className={styles.garden}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gardenRow}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={styles.gardenCell}
                style={{ backgroundColor: cell ? cell.color : "#27ae60" }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.wallet}>
        <h3>Coins: {coins}</h3>
      </div>
    </div>
  );
}

export default Garden;
