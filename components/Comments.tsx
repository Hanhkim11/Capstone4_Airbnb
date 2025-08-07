import { apiComments } from "@/app/api/comments/apicomments";
import { TComment } from "@/app/types/typeComments";
import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Skeleton, Rate, Input, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/app/redux/hooks";
import { SendOutlined } from "@ant-design/icons";

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

  const pageSize = 10;

  useEffect(() => {
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

  return (
    <div className="mt-10">
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
      <div className="mt-5 flex items-center gap-2">
        <Avatar className="shadow-lg" size={40} src={userLogin?.user?.avatar} />
        <Input placeholder="Nhập bình luận của bạn..." className="mt-2 !p-2" />

        <Button
          className="!p-2 !h-10"
          icon={<SendOutlined />}
          iconPosition="start"
          type="primary"
        >
          Gửi
        </Button>
      </div>
      <Rate className="block" defaultValue={0} />
    </div>
  );
};

export default Comments;
