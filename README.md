<p align="center">
  <img width=215.5px height=438.5px src="https://github.com/RCJacH/RCRemote/assets/12930244/088ced1c-4893-430d-a1fb-97f3618b8260" alt="RCRemote Project Screenshot">
</p>

<h1 align="center">RCRemote</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/rcjach/RCRemote.svg)](https://github.com/rcjach/RCRemote/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/rcjach/RCRemote.svg)](https://github.com/rcjach/RCRemote/pulls)
[![License](https://img.shields.io/badge/license-GPL3.0-blue.svg)](/LICENSE)

</div>

---

<p align="center">An aesthetic and minimalist web remote controller for REAPER<br></p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](#todo)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

RCRemote is a web remote controller for REAPER. It is built with a focus on compatibility with older devices (with ES6), and features a clean, intuitive interface that allows you to control your recording sessions without having to look at the screen (much).

## 🏁 Getting Started <a name = "getting_started"></a>

1. Download the latest RCRemote.html from the [release page](https://github.com/RCJacH/RCRemote/releases), and place the file into the `Plugins\reaper_www_root` folder of your REAPER resources path, which you can find in REAPER by using the `Show REAPER resource path in explorer` command, which is also available at the bottom of the default `Main options` menu.
2. Nagivate to the `Control/OSC/web` tab in the REAPER preferences, and click `add` to add a new controller.

    ![REAPER_Preferences](https://github.com/RCJacH/RCRemote/assets/12930244/765b8339-3da3-454d-aab4-40ddc21f652b)

3. In the new `Control Surface Settings` window:
    - set `Control surface mode` to `Web browser interface`
    - select `RCRemote.html`
    - Remember the `Access URL`, this is the address to connect to the remote controller from your browser.
    - Finally, click through the `OK`s.

    ![REAPER_Control-Surface-Settings](https://github.com/RCJacH/RCRemote/assets/12930244/00d9ed2c-1232-410a-a89e-8bd130af1c57)

4. Open a browser on any device and enter the `Access URL` from the previous step, and you should be seeing the RCRemote page.
5. Have fun.

## 🎈 Usage <a name="usage"></a>

Currently there is only one page, with three sections. `Screen`, `Settings`, and `Playback`.

### Screen

The screen is at the top of the page.
It displays the current transport state, e.g. `Stopped`, `Playing`, `Recording`, and if connection is not established, `Initializing...`.

There are two hidden buttons at the horizontal edge of the screen, used to move the edit cursor by a step unit set in the Settings section (explained later), with the one on the left being rewind, and the one on the right fast-forward.

The bottom of the screen hosts an optional marker/region progress bar. it displays the current position as a location icon at the center, and shows markers and regions that are within the range of the current position, again adjustable in the Settings.

Which brings us to...

### Settings

There are two groups of buttons here. First group affects the RCRemote UI, and the second group toggle states of related commands.

In the first group:
- The first button sets the step unit of the position buttons on the screen. It can be set to a beat (represented by a quarter note), a measure (represented by a whole note), or by marker/region (represented by a flag).
- The second button with a menu icon doesn't do anything. It's not a bug, but a feature, yet to be implemented.
- The third button sets the range of the progress bar. There are three choices, being 2, 4, or 8 seconds (because I couldn't retrieve tempo info from native API). However, I lied. There's a fourth choice of not displaying the progress bar at all. Hiding the progress bar might reduce battery consumption.

The buttons in the second group have a bit more obvious functions. They each toggles a command state, being, from left to right, Pre-roll (on record), Metronome, and repeat.

### Playback

There are total of 8 buttons, but only 4 displayed simultaneously depending on the transport state. The icons should give a big hint on what each button does, but here's a list of the buttons and their functions (when successfully established connection):

- `Play`: requests the transport to play.
- `Pause`: pauses the transport (but currently disabled because I don't like pausing)
- `Record`: requests the transport to record.
- `Save`: attempts to save the project.
- `Stop`: stops playing or recording.
- `Abort`: aborts recording and discards the take.
- `Undo`: undo an action, and switches to Redo.
- `Redo`: redo an action, and switches to Undo (so only one undo step is possible).

## ⛏️ Built Using <a name = "built_using"></a>

- [Typescript](https://typescriptlang.org/) Programing Language
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [pNpM](https://pnpm.io/) Package Manager
- [NodeJs](https://nodejs.org/en/) - Server Environment

## 🚀 TODO <a name = "todo"></a>

- More Pages!
- More Buttons!
- More...!?

To be honest, I have been using an earlier prototype for years, recording vocals professionally at studios. This rewrite is mainly to beautify the interface, so my clients would consider it as some sort of expensive app, more than they already do. You know, like buying racks of vintage equipments that we never use, just to flash out the scene, so the clients are more likely to be wowed and hopefully pay more than pennies.

Anyway, if I were to expand this app, perhaps adding other pages such as a track mixer, a midi controller, and a project navigator.

That sounds like a lot of work, so maybe not.

## ✍️ Authors <a name = "authors"></a>

- [@RCJacH](https://github.com/RCJacH) - Idea & work of love
- [ChatGTP](https://chat.openai.com/) - Consultant

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Icons stolen from Font Awesome free tier.
- Playback button style based on [this codepen](https://codepen.io/sinusshahi/pen/abYONBN)