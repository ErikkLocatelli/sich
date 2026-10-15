import type { Image } from './image'

export type Service = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: string;
    status: "active" | "paused";
    images: Image[];
  };

export const services: Service[] = [
    { id: 1, name: "Esmaltação em Gel", description: "Esmaltação em Gel", category: "Manicure", price: 50, duration: "1h", status: "active", images: [{id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8479KnsDPB-0e8nYwdAq1OKea1982a6NGSqY4sLt2A&s=10"}, {id: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLZJObcdEDMbmQMPAlMXKssMLcCgG2Smul8MUEtUkvw&s=10"}] },
    
    { id: 2, name: "Manicure", description: "Manicure", category: "Manicure", price: 30, duration: "45", status: "paused", images: [{id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}] },
    
    { id: 3, name: "Pedicure", description: "Pedicure", category: "Manicure", price: 40, duration: "1h", status: "active", images: [{id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}] },
    
    { id: 4, name: "Alongamento", description: "Alongamento", category: "Manicure", price: 80, duration: "1h30", status: "paused", images: [{id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 4, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}, {id: 5, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SkuGocqAaZzL_6yszwEp0xukNxXja8r2fv0E5o4PQ&s=10"}] },
  ]