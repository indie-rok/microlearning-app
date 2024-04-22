"use client";

import { Progress, Button, Divider, Alert, Flex, notification } from "antd";
import { useEffect, useState } from "react";

import { useCoinStore } from "@/app/_lib/store";
import { useRouter } from "next/navigation";

export default function One() {
  const [continueIsActive, setContinueIsActive] = useState(false);
  const { push } = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [correctAnswerCount, setCorrectAnwerCount] = useState(0);
  const increaseCoins = useCoinStore((state) => state.increaseCoins);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersSlide1, setAnswersSlide1] = useState([]);
  const [words] = useState([
    { id: 1, text: "database table", category: "db" },
    { id: 2, text: "excel sheet", category: "db" },
    { id: 3, text: "database", category: "relational" },
    { id: 4, text: "relational", category: "relational" },
  ]);

  const [selectedWord, setSelectedWord] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleWordClick = (word) => {
    if (selectedWord === null) {
      setSelectedWord(word);
    } else {
      setMatches((prev) => [...prev, selectedWord.id, word.id]);
      if (
        selectedWord.category === word.category &&
        selectedWord.id !== word.id
      ) {
        api["success"]({
          message: "Correct",
        });
        setCorrectAnwerCount(correctAnswerCount + 1);
      } else {
        api["error"]({
          message: "incorrect",
        });
      }
      setSelectedWord(null);
    }
  };

  const getButtonStyle = (word) => {
    if (selectedWord?.id === word.id) {
      return { border: "2px solid green" };
    } else if (matches.includes(word.id)) {
      return { backgroundColor: "lightgrey", color: "white" };
    }
    return {};
  };

  useEffect(() => {
    if (answersSlide1.length == 2 || matches.length === 4) {
      setContinueIsActive(true);
    }
  }, [answersSlide1, matches]);

  const slides = [
    {
      children: (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "24px", padding: 48 }}>
            A relational database store information in a ______ way
          </p>
          <div>
            <Button
              onClick={() => {
                grade(true);
              }}
            >
              Structured
            </Button>
            <Button
              onClick={() => {
                grade(false);
              }}
            >
              Un structured
            </Button>
          </div>
        </div>
      ),
    },
    {
      children: (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "24px", padding: 48 }}>
            Databases have
            <span
              style={{ textDecorationLine: "underline", padding: "0 10px" }}
            >
              {answersSlide1[0] || "____"}
            </span>
            which allow to group{" "}
            <span
              style={{ textDecorationLine: "underline", padding: "0 10px" }}
            >
              {answersSlide1[1] || "____"}
            </span>
            information together
          </p>
          <div>
            <Button
              onClick={() => {
                setAnswersSlide1((oldState) => [...oldState, "tables"]);
              }}
            >
              Tables
            </Button>
            <Button
              onClick={() => {
                setAnswersSlide1((oldState) => [...oldState, "similar"]);
              }}
            >
              Similar
            </Button>
          </div>
        </div>
      ),
    },
    {
      children: (
        <div style={{ textAlign: "center" }}>
          <Alert
            message="2 good answers! Keep going!"
            closable
            type="success"
            showIcon
          />
          <h2 style={{ padding: "16px " }}>Connect similar words</h2>

          <Flex justify="center" align="center" gap="middle">
            {words.map((word) => (
              <Button
                key={word.id}
                disabled={matches.includes(word.id)}
                style={getButtonStyle(word)}
                onClick={() => handleWordClick(word)}
              >
                {word.text}
              </Button>
            ))}
          </Flex>
        </div>
      ),
    },
    {
      children: (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: 100,
          }}
        >
          <p>Good job, you got {correctAnswerCount} good answers.</p>
          <p>{correctAnswerCount * 100} coins for you!</p>
          <Button
            type="primary"
            onClick={() => {
              api["success"]({
                message: "Coins Added",
                placement: "bottomRight",
              });
              increaseCoins(correctAnswerCount * 100);
            }}
          >
            Get my rewards
          </Button>

          <Divider />

          <Button
            type="primary"
            onClick={() => {
              push("/courses/sql");
            }}
          >
            Go to course home
          </Button>
        </div>
      ),
    },
  ];

  function grade() {
    setCorrectAnwerCount(correctAnswerCount + 1);
    setContinueIsActive(true);
  }

  return (
    <div>
      <Progress percent={Math.ceil((currentQuestion / slides.length) * 100)} />

      <Divider />
      {contextHolder}

      {slides[currentQuestion].children}

      <Divider />

      {continueIsActive && (
        <div>
          <Alert message="Good job!" type="success" showIcon />
          <br />
          <Button
            type="primary"
            onClick={() => {
              setContinueIsActive(false);
              setCurrentQuestion(currentQuestion + 1);
            }}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
