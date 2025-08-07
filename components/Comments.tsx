"use ";
import { apiComments } from "@/app/api/comments/apicomments";
import { TComment, TCommentPost } from "@/app/types/typeComments";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  List,
  Skeleton,
  Rate,
  Input,
  Button,
  notification,
  Space,
  message,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/app/redux/hooks";
import { SendOutlined } from "@ant-design/icons";
import { error } from "console";
import { get } from "http";

interface CommentsProps {
  id: string;
}

const Comments = ({ id }: CommentsProps) => {
  const [allComments, setAllComments] = useState<TComment[]>([]);
  const [visibleComments, setVisibleComments] = useState<TComment[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const { userLogin } = useAppSelector((state) => state.user);

  const [valueInput, setValueInput] = useState<string>("");

  const [starComments, setStarComments] = useState<number>(0);

  const [api, contextHolder] = notification.useNotification();

  const pageSize = 10;

  const getAllComments = async () => {
    apiComments
      .apiGetCommentsByRoomId(id)
      .then((res) => {
        console.log(res);
        setAllComments(res);
        setVisibleComments(res.slice(0, pageSize));
        setPage(1);
        setHasMore(res.length > pageSize);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllComments();
  }, [id]);

  const loadMoreData = () => {
    if (loading) return;

    const nextPage = page + 1;
    const start = (nextPage - 1) * pageSize;
    const end = nextPage * pageSize;
    const nextData = allComments.slice(start, end);

    setVisibleComments((prev) => [...prev, ...nextData]);
    setPage(nextPage);

    if (end >= allComments.length) {
      setHasMore(false);
    }
  };

  // handle post comment
  const handlerPostComment = () => {
    const date = new Date();
    const newComment: TCommentPost = {
      id: 0,
      maPhong: Number(id),
      maNguoiBinhLuan: userLogin?.user.id || 0,
      ngayBinhLuan: date.toISOString(),
      noiDung: valueInput,
      saoBinhLuan: starComments,
    };
    apiComments
      .apiPostComment(newComment)
      .then((res) => {
        api.success({
          message: "Gửi bình luận thành công!",
          description: "Cảm ơn bạn đã đóng góp ý kiến.",
          placement: "top",
        });
        getAllComments();
        setValueInput("");
        setStarComments(0);
      })
      .catch((error) => {
        api.error({
          message: "Gửi bình luận thất bại!",
        });
      });
  };

  return (
    <div className="mt-10">
      {contextHolder}
      <div
        className="shadow-md rounded-md p-5"
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
        }}
      >
        <InfiniteScroll
          dataLength={visibleComments.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={visibleComments}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.tenNguoiBinhLuan} </p>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.saoBinhLuan}
                      />
                    </div>
                  }
                  description={item.noiDung}
                />

                <div>{item.ngayBinhLuan}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <div className="mt-5 flex gap-2">
        <Avatar className="shadow-lg" size={40} src={userLogin?.user?.avatar} />

        <div className="flex flex-col gap-2 w-full">
          <Input
            value={valueInput}
            onChange={(event) => {
              setValueInput(event.target.value);
            }}
            placeholder="Nhập bình luận của bạn..."
            className="mt-2 !p-2"
          />
          <Rate
            onChange={(value) => {
              setStarComments(value);
            }}
            className="block"
            defaultValue={0}
          />
        </div>
        <Button
          onClick={handlerPostComment}
          className="!p-2 !h-10"
          icon={<SendOutlined />}
          iconPosition="start"
          type="primary"
        >
          Gửi
        </Button>
      </div>
    </div>
  );
};

export default Comments;
