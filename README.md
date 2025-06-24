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
