"use client";
import Image from "next/image";
import { Avatar } from "primereact/avatar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PanelMenu } from "primereact/panelmenu";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/soho-light/theme.css";
import stat from "./mock-jsons/Match/match-stats.json";
import detailsGame1 from "./mock-jsons/match/match-details/game1.json";
import detailsGame2 from "./mock-jsons/match/match-details/game2.json";
import detailsGame3 from "./mock-jsons/match/match-details/game3.json";
import detailsGame4 from "./mock-jsons/match/match-details/game4.json";
import statsGame1 from "./mock-jsons/match/match-stats/game1.json";
import statsGame2 from "./mock-jsons/match/match-stats/game2.json";
import statsGame3 from "./mock-jsons/match/match-stats/game3.json";
import statsGame4 from "./mock-jsons/match/match-stats/game4.json";
import * as _ from "lodash";

// Sidebar items (PanelMenu items)
const items = [
  {
    label: "Season 51",
    items: [
      {
        label: "Game Stats",
        icon: "people",
      },
      {
        label: "Player Stats",
        items: [
          {
            label: "Player 1",
            icon: "person",
          },
          {
            label: "Player 2",
            icon: "person",
          },
          {
            label: "Player 3",
            icon: "person",
          },
          {
            label: "Player 4",
            icon: "person",
          },
          {
            label: "Player 5",
            icon: "person",
          },
        ],
      },
    ],
  },
  {
    label: "Season 50",
    items: [
      {
        label: "Game Stats",
        icon: "people",
      },
      {
        label: "Player Stats",
        items: [
          {
            label: "Player 1",
            icon: "person",
          },
          {
            label: "Player 2",
            icon: "person",
          },
          {
            label: "Player 3",
            icon: "person",
          },
          {
            label: "Player 4",
            icon: "person",
          },
          {
            label: "Player 5",
            icon: "person",
          },
        ],
      },
    ],
  },
];

const valMap = {
  round: "Game",
  "rounds[0].teams": "Opponent",
  "teams.faction[1|2].name": "Opponent",
  OppElo: "",
  "Opp Rec": "",
  "Win%": "",
  Map: "rounds[0].round_stats.map",
  "results.winner": "Result",
  RW: "rounds[0].teams[0|1].final score",
  RL: "rounds[0].teams[0|1].final score",
  Start: "",
  Pistol: "",
  "T RW": "[rounds[0].teams[0|1].team_stats.First Half Score - 12]",
  "T RL": "[rounds[0].teams[0|1].team_stats.First Half Score - 12]",
  "CT RW": "[rounds[0].teams[0|1].team_stats.Second Half Score - 12]",
  "CT RL": "[rounds[0].teams[0|1].team_stats.Second Half Score - 12]",
  "OT RW": "[rounds[0].round_stats.Overtime score]",
  "OT RL":
    "[rounds[0].round_stats.rounds - rounds[0].round_stats.Overtime score]",
  Rounds: "rounds[0].round_stats.rounds",
};

const findTeam = (arr: Array, teamId: String) => {
  return _.findIndex(arr, (x) => {
    return x.team_id == teamId;
  });
};

export default function Page() {
  const stats = stat.rounds[0].teams[1].players;
  const mainTeamId = "4423aba6-adb2-41e7-8b1a-5d21a576ac6a";
  const mergedGame1 = _.merge(detailsGame1, statsGame1);
  const mergedGame2 = _.merge(detailsGame2, statsGame2);
  const mergedGame3 = _.merge(detailsGame3, statsGame3);
  const mergedGame4 = _.merge(detailsGame4, statsGame4);

  const matches = [mergedGame1, mergedGame2, mergedGame3, mergedGame4];

  return (
    <PrimeReactProvider>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="h-min flex flex-row bg-background-base p-4 justify-between items-center">
          <Image
            src="https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/global/logo_cs_sm.svg"
            alt="CS2 Logo"
            width={200}
            height={64}
          />
          <h1 className="text-5xl text-white">Wallet Inspector Game Log</h1>
          <Avatar
            label="V"
            size="large"
            style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
            shape="circle"
          />
        </div>
        {/* Center Content */}
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white hidden md:block">
            {/* Sidebar content */}
            <PanelMenu model={items} className="p-3" />
          </aside>
          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6 bg-gray-100">
            {/* Scrollable DataTable Container */}
            <div className="w-full overflow-x-auto">
              {/* Game Stats */}
              <DataTable
                value={matches}
                showGridlines
                className="min-w-full table-auto"
              >
                {/* <Column header="Group" field={`group`} /> */}
                <Column header="Round" field={`round`} />
                <Column
                  header="Opponent"
                  body={(gameData) => {
                    return gameData.teams.faction1.name === "Tax Evaders"
                      ? gameData.teams.faction2.name
                      : gameData.teams.faction1.name;
                  }}
                />
                {/* <Column header="Elo" field={``} />
                <Column header="Opp Rec" field={``} /> 
                <Column header="Win%" field={``} /> */}
                {/* // TODO parsewinner name */}
                <Column header="Result" field={`results.winner`} />
                <Column header="Map" field={`voting.map.pick`} />
                <Column header="Start" field={``} />
                <Column header="Pistol" field={``} />
                <Column
                  header="RW"
                  body={(gameData) => {
                    if (!gameData.rounds) return "N/A";
                    const teams = gameData.rounds[0].teams;

                    return teams[findTeam(teams, mainTeamId)].team_stats[
                      "Final Score"
                    ];
                  }}
                />
                <Column
                  header="RL"
                  body={(gameData) => {
                    if (!gameData.rounds) return "N/A";
                    const teams = gameData.rounds[0].teams;
                    const teamIndex = findTeam(teams, mainTeamId) === 1 ? 0 : 1;

                    return teams[teamIndex].team_stats["Final Score"];
                  }}
                />
                <Column header="RW" field={``} />
                <Column header="RL" field={``} />
                <Column header="RW" field={``} />
                <Column header="RL" field={``} />
                <Column header="RW" field={``} />
                <Column header="RL" field={``} />
              </DataTable>
              {/* Player Stats */}
              <DataTable
                value={stats}
                showGridlines
                className="min-w-full table-auto"
              >
                <Column
                  field="nickname"
                  header="Name"
                  className="p-3 text-left"
                ></Column>
                {Object.keys(stats[0].player_stats).map((key, i) => (
                  <Column
                    key={key}
                    className="p-3 text-center"
                    field={`player_stats.${key}`}
                    header={key}
                  />
                ))}
              </DataTable>
            </div>
          </main>
        </div>
        {/* footer */}
        <footer className="bg-background-base row-start-3 py-6 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="https://nextjs.org/icons/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </PrimeReactProvider>
  );
}
