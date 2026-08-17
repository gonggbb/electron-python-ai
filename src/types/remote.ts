/** GitHub Release 精简结构（与主进程 get-remote-versions 返回一致） */
export interface RemoteAsset {
  name: string;
  downloadUrl: string;
  size: number;
}

export interface RemoteVersion {
  tag: string;
  name: string;
  publishedAt: string;
  body: string;
  htmlUrl: string;
  assets: RemoteAsset[];
}
