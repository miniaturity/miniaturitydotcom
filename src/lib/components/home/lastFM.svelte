<script lang="ts">
    import type { LastFmRecentTracksResponse } from "$lib/types";
    import { onMount } from "svelte";
    import "7.css/dist/7.scoped.css";

    let { lastDate = $bindable() }: { lastDate: string } = $props();

    let songName = $state<string | null>(null);
    let songArtist = $state<string | null>(null);
    let songAlbum = $state<string | null>(null);
    let songLink = $state<string | null>(null);
    let totalScrobbles = $state<string | null>(null);
    let songImage = $state<string | null>(null);
    let date = $state<string | null>(null);
    let isSingle = $derived<boolean>(songAlbum === "[Single]")

    async function getRecentTrack() {
        const response = await fetch("https://lastfm-api-proxy.minimeow.workers.dev/user/getRecentTracks?user=miniaturity&limit=1");
        const json: LastFmRecentTracksResponse = await response.json();

        const track = json.recenttracks.track[0];

        songName = track.name;
        songArtist = track.artist["#text"];
        songAlbum = track.album["#text"];
        if (songAlbum === songName) songAlbum = "[Single]";
        songLink = track.url;
        totalScrobbles = json.recenttracks["@attr"].total;
        date = track.date ? formatDate(track.date["#text"]) : "now!";

        // find highest quality image available. auto falls back to lower qualities if not found.
        songImage = [...track.image].reverse().find(img => img["#text"] !== "")?.["#text"] ?? null;
        lastDate = date;
    }

    function formatDate(lastfmDate: string): string {
        const [datePart, timePart] = lastfmDate.split(", ");
        const [day, month, year] = datePart.split(" ");
        const date = new Date(`${month} ${day}, ${year} ${timePart} UTC`);

        return date.toLocaleString("en-US", {
            timeZone: "America/New_York",
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    onMount(() => {
        getRecentTrack();
    });
</script>

<div class="win7" style="pointer-events: all;">
    <div class="window active">
        <div class="title-bar">
            <div class="title-bar-text">lastfm</div>
            <div class="title-bar-controls">
            <button aria-label="Help"></button>
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize" disabled></button>
            <button aria-label="Close"></button>
            </div>
        </div>

        <div class="window-body">
            <div class="lastfm">
                <div class="album-art">
                    <img alt="" src={songImage || "/logos/dts.png"}/>
                </div>

                <div class="song-info">
                    <a id="si-name" href={songLink || "/"} target="_blank" rel="noopener noreferrer">
                        {songName || "loading"}
                    </a>

                    <div id="si-desc">
                        <span id="si-artist">by: {songArtist || "..."}</span>
                        {#if !isSingle}
                            <span id="si-album">on: {songAlbum || "..."}</span>
                        {:else}
                            <span id="si-album">single</span>
                        {/if}
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>

<style lang="scss">

    .lastfm {
        box-sizing: border-box;
        
        
        width: 250px;
        aspect-ratio: 6 / 2;
        
        display: flex;
        flex-direction: row;
        padding: 12px;
        gap: 12px;

        overflow-y: auto;
    }

    .song-info {
        display: flex;
        flex-direction: column;
    }

    .si-desc {
        display: flex;
        flex-direction: column;
        
    }

    #si-name {
        display: block;
        text-decoration: none;
        cursor: pointer;
        color: #000;
        font-size: var(--fs-t-l);
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 150px;
        min-height: 20px;
        overflow: hidden;

        &:hover {
            text-decoration: underline;
        }
    }

    #si-desc {
        --g: 6px;
        display: flex;
        flex-direction: column;
        
        color: #000;
        padding-top: var(--g);
        

        & span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: color 0.2s ease;
            font-size: var(--fs-t-c);
            max-width: 150px;
            &:hover {
                color: #000;
            }
        }
        

    }


    .album-art {
        --c: #fff;

        aspect-ratio: 1 / 1;
        border: 2px solid var(--c);
        background: var(--bc);
    
        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

</style>