export interface TypeLocationPagination {
  data: TypeLocation[];
  keyword: null | string;
  pageIndex: number;
  pageSize: number;
  totalRow: number;
}
export interface TypeLocation {
  hinhAnh: string;
  id: number;
  quocGia: string;
  tenViTri: string;
  tinhThanh: string;
}
