import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment
}: Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl ${isComment ? "px-0 xs:px-7" : " bg-dark-2 p-7"}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Picture"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h3 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h3>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {content}
            </p>
            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="Heart Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="Reply Icon"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="Repost Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="Share Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
        {!isComment && community && (
          <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)} - {community.name} Community
            </p>
            <Image 
              src={community.image}
              alt={community.name}
              width={20}
              height={20}
              className="ml-2 rounded-full object-cover cursor-pointer"
            />
          </Link>
        )}
    </article>
  );
};

export default ThreadCard;
