import React, { useContext, useState, useEffect } from "react"; // Added useEffect import here
import Logo from "@/components/Logo";
import Text13 from "@/components/Text/Text13";
import Text15 from "@/components/Text/Text15";
import Text24 from "@/components/Text/Text24";
import { CreateButton, LoginButton } from "@/components/button/CreateButton";
import { StateContext } from "@/context/StateContext";
import { setCookie } from "nookies";
import axios from "axios";

const LoginPage = () => {
  const { setAuthorized, api_url, token, setToken, Login } =
    useContext(StateContext);
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" }); // State to store the fetched quote

  useEffect(() => {
    const fetchQuote = async () => {
      const data = [
        {
          q: "The only way to do great work is to love what you do.",
          a: "Steve Jobs",
        },
        {
          q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          a: "Winston Churchill",
        },
        {
          q: "Believe you can and you're halfway there.",
          a: "Theodore Roosevelt",
        },
        {
          q: "The secret of getting ahead is getting started.",
          a: "Mark Twain",
        },
        {
          q: "Don't watch the clock; do what it does. Keep going.",
          a: "Sam Levenson",
        },
        {
          q: "The future belongs to those who believe in the beauty of their dreams.",
          a: "Eleanor Roosevelt",
        },
        {
          q: "Life is 10% what happens to us and 90% how we react to it.",
          a: "Charles R. Swindoll",
        },
        {
          q: "The only limit to our realization of tomorrow will be our doubts of today.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "In the middle of every difficulty lies opportunity.",
          a: "Albert Einstein",
        },
        {
          q: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
          a: "Roy T. Bennett",
        },
        {
          q: "Success is walking from failure to failure with no loss of enthusiasm.",
          a: "Winston Churchill",
        },
        {
          q: "Your time is limited, don't waste it living someone else's life.",
          a: "Steve Jobs",
        },
        {
          q: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
          a: "Christian D. Larson",
        },
        {
          q: "The only thing we have to fear is fear itself.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "You miss 100% of the shots you don't take.",
          a: "Wayne Gretzky",
        },
        {
          q: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
          a: "Jimmy Dean",
        },
        {
          q: "You are never too old to set another goal or to dream a new dream.",
          a: "C.S. Lewis",
        },
        {
          q: "The only way to do great work is to love what you do.",
          a: "Steve Jobs",
        },
        {
          q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          a: "Winston Churchill",
        },
        {
          q: "Believe you can and you're halfway there.",
          a: "Theodore Roosevelt",
        },
        {
          q: "The secret of getting ahead is getting started.",
          a: "Mark Twain",
        },
        {
          q: "Don't watch the clock; do what it does. Keep going.",
          a: "Sam Levenson",
        },
        {
          q: "The future belongs to those who believe in the beauty of their dreams.",
          a: "Eleanor Roosevelt",
        },
        {
          q: "Life is 10% what happens to us and 90% how we react to it.",
          a: "Charles R. Swindoll",
        },
        {
          q: "The only limit to our realization of tomorrow will be our doubts of today.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "In the middle of every difficulty lies opportunity.",
          a: "Albert Einstein",
        },
        {
          q: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
          a: "Roy T. Bennett",
        },
        {
          q: "Success is walking from failure to failure with no loss of enthusiasm.",
          a: "Winston Churchill",
        },
        {
          q: "Your time is limited, don't waste it living someone else's life.",
          a: "Steve Jobs",
        },
        {
          q: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
          a: "Christian D. Larson",
        },
        {
          q: "The only thing we have to fear is fear itself.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "You miss 100% of the shots you don't take.",
          a: "Wayne Gretzky",
        },
        {
          q: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
          a: "Jimmy Dean",
        },
        {
          q: "You are never too old to set another goal or to dream a new dream.",
          a: "C.S. Lewis",
        },
        {
          q: "The only way to do great work is to love what you do.",
          a: "Steve Jobs",
        },
        {
          q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          a: "Winston Churchill",
        },
        {
          q: "Believe you can and you're halfway there.",
          a: "Theodore Roosevelt",
        },
        {
          q: "The secret of getting ahead is getting started.",
          a: "Mark Twain",
        },
        {
          q: "Don't watch the clock; do what it does. Keep going.",
          a: "Sam Levenson",
        },
        {
          q: "The future belongs to those who believe in the beauty of their dreams.",
          a: "Eleanor Roosevelt",
        },
        {
          q: "Life is 10% what happens to us and 90% how we react to it.",
          a: "Charles R. Swindoll",
        },
        {
          q: "The only limit to our realization of tomorrow will be our doubts of today.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "In the middle of every difficulty lies opportunity.",
          a: "Albert Einstein",
        },
        {
          q: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
          a: "Roy T. Bennett",
        },
        {
          q: "Success is walking from failure to failure with no loss of enthusiasm.",
          a: "Winston Churchill",
        },
        {
          q: "Your time is limited, don't waste it living someone else's life.",
          a: "Steve Jobs",
        },
        {
          q: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
          a: "Christian D. Larson",
        },
        {
          q: "The only thing we have to fear is fear itself.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "You miss 100% of the shots you don't take.",
          a: "Wayne Gretzky",
        },
        {
          q: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
          a: "Jimmy Dean",
        },
        {
          q: "You are never too old to set another goal or to dream a new dream.",
          a: "C.S. Lewis",
        },
        {
          q: "The only way to do great work is to love what you do.",
          a: "Steve Jobs",
        },
        {
          q: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          a: "Winston Churchill",
        },
        {
          q: "Believe you can and you're halfway there.",
          a: "Theodore Roosevelt",
        },
        {
          q: "The secret of getting ahead is getting started.",
          a: "Mark Twain",
        },
        {
          q: "Don't watch the clock; do what it does. Keep going.",
          a: "Sam Levenson",
        },
        {
          q: "The future belongs to those who believe in the beauty of their dreams.",
          a: "Eleanor Roosevelt",
        },
        {
          q: "Life is 10% what happens to us and 90% how we react to it.",
          a: "Charles R. Swindoll",
        },
        {
          q: "The only limit to our realization of tomorrow will be our doubts of today.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "In the middle of every difficulty lies opportunity.",
          a: "Albert Einstein",
        },
        {
          q: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
          a: "Roy T. Bennett",
        },
        {
          q: "Success is walking from failure to failure with no loss of enthusiasm.",
          a: "Winston Churchill",
        },
        {
          q: "Your time is limited, don't waste it living someone else's life.",
          a: "Steve Jobs",
        },
        {
          q: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
          a: "Christian D. Larson",
        },
        {
          q: "The only thing we have to fear is fear itself.",
          a: "Franklin D. Roosevelt",
        },
        {
          q: "You miss 100% of the shots you don't take.",
          a: "Wayne Gretzky",
        },
        {
          q: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
          a: "Jimmy Dean",
        },
        {
          q: "You are never too old to set another goal or to dream a new dream.",
          a: "C.S. Lewis",
        },
        // Add more quotes here
      ];
      const { q: quote, a: author } =
        data[Math.floor(Math.random() * data.length)];
      setQuoteData({ quote, author });
    };

    fetchQuote();
  }, []);

  let url = `${api_url}/send-otp`;
  const handleSendCode = async () => {
    let real = phone;
    if (phone.length == 10) {
      real = "+1" + phone;
    }

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: real,
      }),
    };
    try {
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          setSuccess(json.success);
          localStorage.setItem("phone", real);
        })
        .catch((err) => console.error("error:" + err));
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleLogin = async () => {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"username":"${phone}","password":"${code}"}`,
    };
    try {
      if (success) {
        Login(options);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center py-20 px-6 md:px-0 mx-auto w-full md:max-w-[427px]">
      <div className="flex flex-col items-center justify-center text-center mx-auto w-full">
        <Logo />
        <span
          className={`text-xs leading-[15px] lg:text-xxs lg:leading-4 2xl:text-mini 2xl:leading-[18px] font-inter font-semibold text-primary`}
        >
          <p style={{ color: "white" }}>{quoteData.quote}</p>
          <p>- {quoteData.author}</p>
        </span>
      </div>
      <div className="flex flex-col items-center gap-[26px] mt-[51px] w-full">
        <Text24 color="white" title="Login to Simplify" />
        <div className="flex flex-col gap-[13px] w-full">
          <div className="flex flex-col gap-[9px]">
            <Text13 color="primary" title="Phone Number" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-px border-[#2B2B2B] appearance-none input-bg outline-none py-3 px-[17px] w-full rounded-lg text-sm font-inter font-medium text-primary placeholder:text-primary"
              type="text"
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="max-w-max flex flex-col items-center justify-center mx-auto">
            <CreateButton title="Send Code" onClick={handleSendCode} />
            {success && (
              <p
                style={{
                  color: "#6d6d6e",
                  fontSize: "13px", // Set the desired font size
                  fontFamily: "Inter", // Set the desired font family
                  fontWeight: "semibold", // Set the desired font weight
                  lineHeight: "1.5", // Set the desired line height
                  margin: "0", // Remove any default margins
                }}
              >
                Code sent!
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[13px] w-full">
          <div className="flex flex-col gap-[9px]">
            <Text13 color="primary" title="Verification Code" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border-px border-[#2B2B2B] input-bg outline-none py-3 px-[17px] w-full rounded-lg text-sm font-inter font-medium text-primary placeholder:text-primary"
              type="text"
              placeholder="Enter Code"
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleLogin();
                }
              }}
            />
          </div>
          <div className="max-w-max flex items-center justify-center mx-auto">
            <LoginButton title="Login" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
