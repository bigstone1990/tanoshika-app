import { Link } from "@inertiajs/react";
import styled from 'styled-components'

type PaginationProps = {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

const StyledPaginationLink = styled(Link)`
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  line-height: 1rem;
  border-width: 1px;
  border-radius: 0.25rem;

  &:hover {
    background-color: #4b5563;
    color: #ffffff;
  }

  &:focus {
    background-color: #4b5563;
    color: #ffffff;   
  }
`;

export default function Pagination({ links }: PaginationProps) {
  return (
    <>
      {links.length > 3
        ? <div className="flex flex-wrap -mb-1">{links.map((link, index) => (
          link.url === null
            ? <div dangerouslySetInnerHTML={{ __html: link.label }} key={index} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-300 border rounded" />
            : link.active
              ? <div dangerouslySetInnerHTML={{ __html: link.label }} key={index} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-white bg-gray-400 border rounded" />
              : <StyledPaginationLink href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} key={index} />
          ))}</div>
        : null
      }
    </>
  )   
}