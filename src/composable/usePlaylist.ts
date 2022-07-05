import { ref, watch } from "vue";
import type { Playlist, PlaylistFile } from '@/services/api/playlist';
import { api } from "@/services";
import useAsync from "@/utils/use-async";

const playlists = ref<Playlist[]>([
  {
    id: 1,
    name: 'Playlist 1',
    files: [
      {
        id: 1,
        duration: 30000,
      } as unknown as PlaylistFile,
      {
        id: 2,
        duration: 80000,
      } as unknown as PlaylistFile,
      {
        id: 1,
        duration: 80000,
      } as unknown as PlaylistFile,
    ]
  },
  {
    id: 2,
    name: 'Playlist 2',
    files: [
      {
        id: 3,
        duration: 30000,
      } as unknown as PlaylistFile,
      {
        id: 4,
        duration: 80000,
      } as unknown as PlaylistFile,
      {
        id: 1,
        duration: 80000,
      } as unknown as PlaylistFile,
    ]
  }
]as Playlist[]);

export function usePlaylist() {
  const playlist = ref<Playlist>({} as Playlist);

  async function fetchPlaylist(playlistId: number): Promise<void> {
    playlist.value = playlists.value.find(val => val.id == playlistId) || {} as Playlist;
    console.log(playlistId);
    return;
    playlist.value = {} as Playlist;
    let responsePromise: null | Promise<Playlist> = null;
    responsePromise = api.playlist.getPlaylist({ playlistId: playlistId }).then(res => res.data);

    responsePromise
      .then(response => {
        playlist.value = response;
      })
      .catch(err => {
        console.log(err)
      });
  }

  const { active: playlistDownloading, run: runWrappedFetch } = useAsync(fetchPlaylist);

  return {
    fetchPlaylist: runWrappedFetch,
    playlistDownloading,
    playlist
  }
}