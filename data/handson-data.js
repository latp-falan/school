/**
 * HANDS-ON WORKSHOP MATERIALS
 * ---------------------------
 * Same idea as data/lectures-data.js — this is the only file you need to
 * edit to add hands-on / workshop material to the website.
 *
 * Workshops are grouped by WORKSHOP NAME rather than by day, since several
 * of them repeat across multiple sessions for different student groups.
 * Use the "week" field to name the workshop/activity itself (e.g.
 * "Neuroinflammation by Flow Cytometry"), and use "day" for the specific
 * session date if it's useful context.
 *
 * THREE kinds of entry:
 *
 * 1) GOOGLE DRIVE FILE — type: "drive"
 *    Get a shareable link from Drive ("Anyone with the link can view")
 *    and paste it into "url".
 *
 * 2) SMALL FILE UPLOADED TO GITHUB — type: "file"
 *    Upload the file into the /materials folder (GitHub's "Add file >
 *    Upload files" button), then reference the exact filename in
 *    "filename".
 *
 * 3) TEXT NOTE (no file) — type: "note"
 *    For messages to students — instructions, things to bring, software
 *    to install beforehand, etc. Put the message in "note". Any web link
 *    inside the text (starting with http:// or https://) automatically
 *    becomes clickable. Leave a blank line between paragraphs if you
 *    want more than one.
 *
 * ONE FILE PER ENTRY. If a workshop has several files, just copy-paste
 * the whole entry block again below it and change the title/filename —
 * as many times as you need.
 */

window.HANDSON = [

  // --- Synaptic Plasticity in the Hippocampus ---

  {
    title: "Pre-session note",
    presenter: "Carlos Rozas",
    week: "Synaptic Plasticity in the Hippocampus",
    type: "note",
    note: "Dear Neuroscience School students,\n\nWe'd like to share some material ahead of next week's hands-on session. You don't need to study it in advance — we'll walk you through how to use it during the session.\n\nIf you'd like to have the software we use for data acquisition and analysis on your own laptop, please bring it with you and we'll install it for you. The installation isn't straightforward (it involves tricking the computer into thinking it has a data acquisition card installed), so we'll take care of that part ourselves."
  },
  {
    title: "Analysis files 1",
    presenter: "Carlos Rozas",
    week: "Synaptic Plasticity in the Hippocampus",
    type: "file",
    filename: "P003_ AnalisisThetaBurst_Enero2024.pdf"
  },
  {
    title: "Analysis files 2",
    presenter: "Carlos Rozas",
    week: "Synaptic Plasticity in the Hippocampus",
    type: "file",
    filename: "P002_ AnalisisExtracelular_6Agosto2026.pdf"
  },

  // --- Analysis of Neuroinflammation by Flow Cytometry ---

  {
    title: "Bring your laptop + install software",
    presenter: "Luisa Duarte",
    week: "Analysis of Neuroinflammation by Flow Cytometry",
    type: "note",
    note: "You have to bring your personal computers on day 2 and install this software: https://www.omiq.ai/"
  },

  // ---------------------------------------------------------------------
  // TEMPLATE — Setting up a cheap electrophysiology rig
  // Fill in the real details, then delete the "//" at the start of each
  // line below to activate it.
  // ---------------------------------------------------------------------

  // {
  //   title: "Analysis files 3",
  //   presenter: "Patricio Rojas, Cristian Moreno",
  //   week: "Setting up a cheap electrophysiology rig",
  //   type: "file",
  //   filename: "file3.pdf"
  // },
  // {
  //   title: "Analysis files 4",
  //   presenter: "Patricio Rojas, Cristian Moreno",
  //   week: "Setting up a cheap electrophysiology rig",
  //   type: "file",
  //   filename: "file4.pdf"
  // },

];
