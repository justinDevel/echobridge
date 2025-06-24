# EchoBridge

**Real-time AI voice assistant that empowers people with speech impairments to express themselves clearly.**

![EchoBridge Banner](https://your-image-link-if-any.png)

---

## 🚀 Overview

EchoBridge is a real-time, AI-powered voice assistant built to empower individuals with speech impairments, trauma-related silence, or communication anxiety. Using AWS generative AI services directly from a modern React frontend, EchoBridge rewrites raw text into polite, clear messages and speaks them aloud using natural-sounding voices.

Built for speed, accessibility, and inclusion — EchoBridge brings voice to the voiceless.

---

## ✨ Features

- 🧠 **Tone-aware rewriting** with Amazon Bedrock (Claude / Titan)
- 🗣️ **Natural speech synthesis** using Amazon Polly
- 🌍 **Language detection** using Amazon Comprehend
- ⚡️ Blazing-fast frontend (no custom backend latency)
- 🧑‍🦽 Designed for accessibility: quick-phrase buttons, clean UI

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React (Vite or CRA)            |
| AI Text Gen  | Amazon Bedrock (via SDK)       |
| Speech       | Amazon Polly (via SDK)         |
| Language ID  | Amazon Comprehend              |


---

## 🌐 AWS Services Used

- **Amazon Bedrock** – for polite tone rewriting and smart AI suggestions
- **Amazon Polly** – for text-to-speech using neural, natural-sounding voices
- **Amazon Comprehend** – to auto-detect input language before speaking

---

## 📷 Demo

> Watch our 5-minute demo on how EchoBridge empowers users to communicate clearly and respectfully.

🎥 [Demo Video Link](https://your-demo-link.com)

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/justinDevel/echobridge.git
cd echobridge
npm install


###  Add Environment Variables

Create a `.env` file in the root folder with the following contents:

```env
# AWS Configuration
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_access_key_id_here
VITE_AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
VITE_BEDROCK_MODEL_ID=mistral.mistral-small-2402-v1:0
VITE_AWS_REGION_BEDROCK=us-east-1


```


###  Start the App

```bash
npm run dev
```

Visit the app at: [http://localhost:5173](http://localhost:5173)

---

###  Model Access Tips

If you see a Bedrock permissions error:

* Visit the [Amazon Bedrock Console](https://us-east-1.console.aws.amazon.com/bedrock/home)
* Find the model (`mistral.mistral-small-2402-v1:0`)
* Click **“Request Access”**
* Wait for confirmation before using it in your app

