import { AdministratorInterface } from 'interfaces/administrator';
import { ContentManagerInterface } from 'interfaces/content-manager';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  video?: string;
  photo?: string;
  general_information?: string;
  administrator_id?: string;
  content_manager_id?: string;
  created_at?: any;
  updated_at?: any;

  administrator?: AdministratorInterface;
  content_manager?: ContentManagerInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  video?: string;
  photo?: string;
  general_information?: string;
  administrator_id?: string;
  content_manager_id?: string;
}
