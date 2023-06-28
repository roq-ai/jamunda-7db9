import { ContentInterface } from 'interfaces/content';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentManagerInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  content?: ContentInterface[];
  user?: UserInterface;
  _count?: {
    content?: number;
  };
}

export interface ContentManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
