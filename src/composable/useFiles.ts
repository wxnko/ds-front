import { ref, watch } from "vue";
import type { MultipleFileResponse, File } from '@/services/api/files';
import { api } from "@/services";
import useAsync from "@/utils/use-async";

export const files = ref<File[]>([
  {
    "id": 1,
    "url": "https://eskipaper.com/images/cool-nature-backgrounds-2.jpg",
    "size": "1237864",
    "default_time": "30300",
    "created_at": "2022-06-14T12:00:00.000Z",
    "name": "cool-nature-backgrounds-2.jpg"
  } as unknown as File,
  {
    "id": 2,
    "url": "https://wallpapercave.com/wp/wp2557979.jpg",
    "size": "56744",
    "default_time": "61200",
    "created_at": "2022-05-18T16:33:00.000Z",
    "name": "wp2667979.jpeg"
  } as unknown as File,
  {
    "id": 3,
    "url": "https://img.freepik.com/darmowe-wektory/kolorowe-sylwetki-dloni-tlo_23-2148541792.jpg?w=2000",
    "size": "12353",
    "default_time": "3785003",
    "created_at": "2022-07-01T12:22:00.000Z",
    "name": "wallpaper.jpeg"
  } as unknown as File,
  {
    "id": 4,
    "url": "https://cdn.wallpapersafari.com/54/64/XK5MJr.jpg",
    "size": "32679451",
    "default_time": "120000",
    "created_at": "2022-02-01T06:00:00.000Z",
    "name": "googlelogo.jpeg"
  } as unknown as File,
  {
    "id": 5,
    "url": "https://i.pinimg.com/736x/09/6a/35/096a35453660aa9b83ba4ab6d9182d61.jpg",
    "size": "5894673",
    "default_time": "30000",
    "created_at": "2022-06-18T12:00:00.000Z",
    "name": "googlelogo.jpeg"
  } as unknown as File,
]);
export function useFiles() {
  const filesTotal = ref(2);
  const page = ref(1);

  async function fetchFiles(): Promise<void> {
    files.value = [];
    let responsePromise: null | Promise<MultipleFileResponse> = null;
    responsePromise = api.files.getFiles({ pageSize: 25, page: page.value }).then(res => res.data);

    responsePromise
      .then(response => {
        files.value = response.files;
        filesTotal.value = response.total;
      })
      .catch(err => {
        console.log(err)
      });
  }

  const changePage = (value: number): void => {
    page.value = value;
  }

  const { active: filesDownloading, run: runWrappedFetch } = useAsync(fetchFiles);

  watch(page, runWrappedFetch);
  return {
    fetchFiles: runWrappedFetch,
    filesDownloading,
    files,
    filesTotal,
    changePage,
    page
  }
}