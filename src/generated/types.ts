import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import {
  event_format_choices,
  race_control_messages_categories,
  race_control_messages_flags,
  race_control_messages_scopes,
  session_name_choices,
  telemetry_car_status,
  telemetry_sources,
  tyre_compounds,
} from './enums';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  bigint: { input: bigint; output: bigint };
  event_format_choices: {
    input: event_format_choices;
    output: event_format_choices;
  };
  numeric: { input: number | bigint; output: number | bigint };
  race_control_messages_categories: {
    input: race_control_messages_categories;
    output: race_control_messages_categories;
  };
  race_control_messages_flags: {
    input: race_control_messages_flags;
    output: race_control_messages_flags;
  };
  race_control_messages_scopes: {
    input: race_control_messages_scopes;
    output: race_control_messages_scopes;
  };
  session_name_choices: {
    input: session_name_choices;
    output: session_name_choices;
  };
  telemetry_car_status: {
    input: telemetry_car_status;
    output: telemetry_car_status;
  };
  telemetry_sources: { input: telemetry_sources; output: telemetry_sources };
  tyre_compounds: { input: tyre_compounds; output: tyre_compounds };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "circuits" */
export type Circuits = {
  __typename?: 'circuits';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
};

/** columns and relationships of "circuits" */
export type CircuitsSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "circuits" */
export type CircuitsSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "circuits" */
export type Circuits_Aggregate = {
  __typename?: 'circuits_aggregate';
  aggregate?: Maybe<Circuits_Aggregate_Fields>;
  nodes: Array<Circuits>;
};

/** aggregate fields of "circuits" */
export type Circuits_Aggregate_Fields = {
  __typename?: 'circuits_aggregate_fields';
  avg?: Maybe<Circuits_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Circuits_Max_Fields>;
  min?: Maybe<Circuits_Min_Fields>;
  stddev?: Maybe<Circuits_Stddev_Fields>;
  stddev_pop?: Maybe<Circuits_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Circuits_Stddev_Samp_Fields>;
  sum?: Maybe<Circuits_Sum_Fields>;
  var_pop?: Maybe<Circuits_Var_Pop_Fields>;
  var_samp?: Maybe<Circuits_Var_Samp_Fields>;
  variance?: Maybe<Circuits_Variance_Fields>;
};

/** aggregate fields of "circuits" */
export type Circuits_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Circuits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Circuits_Avg_Fields = {
  __typename?: 'circuits_avg_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "circuits". All fields are combined with a logical 'AND'. */
export type Circuits_Bool_Exp = {
  _and?: InputMaybe<Array<Circuits_Bool_Exp>>;
  _not?: InputMaybe<Circuits_Bool_Exp>;
  _or?: InputMaybe<Array<Circuits_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  f1_key?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "circuits" */
export enum Circuits_Constraint {
  /** unique or primary key constraint on columns "id" */
  CircuitsPkey = 'circuits_pkey',
}

/** input type for incrementing numeric columns in table "circuits" */
export type Circuits_Inc_Input = {
  f1_key?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "circuits" */
export type Circuits_Insert_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Circuits_Max_Fields = {
  __typename?: 'circuits_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Circuits_Min_Fields = {
  __typename?: 'circuits_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "circuits" */
export type Circuits_Mutation_Response = {
  __typename?: 'circuits_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Circuits>;
};

/** input type for inserting object relation for remote table "circuits" */
export type Circuits_Obj_Rel_Insert_Input = {
  data: Circuits_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** on_conflict condition type for table "circuits" */
export type Circuits_On_Conflict = {
  constraint: Circuits_Constraint;
  update_columns?: Array<Circuits_Update_Column>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

/** Ordering options when selecting data from "circuits". */
export type Circuits_Order_By = {
  country?: InputMaybe<Order_By>;
  f1_key?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
};

/** primary key columns input for table: circuits */
export type Circuits_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "circuits" */
export enum Circuits_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  F1Key = 'f1_key',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "circuits" */
export type Circuits_Set_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Circuits_Stddev_Fields = {
  __typename?: 'circuits_stddev_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Circuits_Stddev_Pop_Fields = {
  __typename?: 'circuits_stddev_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Circuits_Stddev_Samp_Fields = {
  __typename?: 'circuits_stddev_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "circuits" */
export type Circuits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Circuits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Circuits_Stream_Cursor_Value_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  f1_key?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Circuits_Sum_Fields = {
  __typename?: 'circuits_sum_fields';
  f1_key?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "circuits" */
export enum Circuits_Update_Column {
  /** column name */
  Country = 'country',
  /** column name */
  F1Key = 'f1_key',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
}

export type Circuits_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Circuits_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Circuits_Set_Input>;
  /** filter the rows which have to be updated */
  where: Circuits_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Circuits_Var_Pop_Fields = {
  __typename?: 'circuits_var_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Circuits_Var_Samp_Fields = {
  __typename?: 'circuits_var_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Circuits_Variance_Fields = {
  __typename?: 'circuits_variance_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "constructor_standings" */
export type Constructor_Standings = {
  __typename?: 'constructor_standings';
  /** An object relationship */
  constructorByConstructorId?: Maybe<Constructors>;
  constructor_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "constructor_standings" */
export type Constructor_Standings_Aggregate = {
  __typename?: 'constructor_standings_aggregate';
  aggregate?: Maybe<Constructor_Standings_Aggregate_Fields>;
  nodes: Array<Constructor_Standings>;
};

export type Constructor_Standings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Constructor_Standings_Aggregate_Bool_Exp_Count>;
};

export type Constructor_Standings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Constructor_Standings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "constructor_standings" */
export type Constructor_Standings_Aggregate_Fields = {
  __typename?: 'constructor_standings_aggregate_fields';
  avg?: Maybe<Constructor_Standings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Constructor_Standings_Max_Fields>;
  min?: Maybe<Constructor_Standings_Min_Fields>;
  stddev?: Maybe<Constructor_Standings_Stddev_Fields>;
  stddev_pop?: Maybe<Constructor_Standings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Constructor_Standings_Stddev_Samp_Fields>;
  sum?: Maybe<Constructor_Standings_Sum_Fields>;
  var_pop?: Maybe<Constructor_Standings_Var_Pop_Fields>;
  var_samp?: Maybe<Constructor_Standings_Var_Samp_Fields>;
  variance?: Maybe<Constructor_Standings_Variance_Fields>;
};

/** aggregate fields of "constructor_standings" */
export type Constructor_Standings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "constructor_standings" */
export type Constructor_Standings_Aggregate_Order_By = {
  avg?: InputMaybe<Constructor_Standings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Constructor_Standings_Max_Order_By>;
  min?: InputMaybe<Constructor_Standings_Min_Order_By>;
  stddev?: InputMaybe<Constructor_Standings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Constructor_Standings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Constructor_Standings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Constructor_Standings_Sum_Order_By>;
  var_pop?: InputMaybe<Constructor_Standings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Constructor_Standings_Var_Samp_Order_By>;
  variance?: InputMaybe<Constructor_Standings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "constructor_standings" */
export type Constructor_Standings_Arr_Rel_Insert_Input = {
  data: Array<Constructor_Standings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** aggregate avg on columns */
export type Constructor_Standings_Avg_Fields = {
  __typename?: 'constructor_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "constructor_standings" */
export type Constructor_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "constructor_standings". All fields are combined with a logical 'AND'. */
export type Constructor_Standings_Bool_Exp = {
  _and?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  _not?: InputMaybe<Constructor_Standings_Bool_Exp>;
  _or?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  constructorByConstructorId?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "constructor_standings" */
export enum Constructor_Standings_Constraint {
  /** unique or primary key constraint on columns "id" */
  ConstructorStandingsPkey = 'constructor_standings_pkey',
}

/** input type for incrementing numeric columns in table "constructor_standings" */
export type Constructor_Standings_Inc_Input = {
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "constructor_standings" */
export type Constructor_Standings_Insert_Input = {
  constructorByConstructorId?: InputMaybe<Constructors_Obj_Rel_Insert_Input>;
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Constructor_Standings_Max_Fields = {
  __typename?: 'constructor_standings_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "constructor_standings" */
export type Constructor_Standings_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Constructor_Standings_Min_Fields = {
  __typename?: 'constructor_standings_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "constructor_standings" */
export type Constructor_Standings_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "constructor_standings" */
export type Constructor_Standings_Mutation_Response = {
  __typename?: 'constructor_standings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Constructor_Standings>;
};

/** on_conflict condition type for table "constructor_standings" */
export type Constructor_Standings_On_Conflict = {
  constraint: Constructor_Standings_Constraint;
  update_columns?: Array<Constructor_Standings_Update_Column>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** Ordering options when selecting data from "constructor_standings". */
export type Constructor_Standings_Order_By = {
  constructorByConstructorId?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** primary key columns input for table: constructor_standings */
export type Constructor_Standings_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "constructor_standings" */
export enum Constructor_Standings_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** input type for updating data in table "constructor_standings" */
export type Constructor_Standings_Set_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Constructor_Standings_Stddev_Fields = {
  __typename?: 'constructor_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Constructor_Standings_Stddev_Pop_Fields = {
  __typename?: 'constructor_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Constructor_Standings_Stddev_Samp_Fields = {
  __typename?: 'constructor_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "constructor_standings" */
export type Constructor_Standings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Constructor_Standings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Constructor_Standings_Stream_Cursor_Value_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructor_Standings_Sum_Fields = {
  __typename?: 'constructor_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "constructor_standings" */
export type Constructor_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** update columns of table "constructor_standings" */
export enum Constructor_Standings_Update_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

export type Constructor_Standings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Constructor_Standings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Constructor_Standings_Var_Pop_Fields = {
  __typename?: 'constructor_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Constructor_Standings_Var_Samp_Fields = {
  __typename?: 'constructor_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Constructor_Standings_Variance_Fields = {
  __typename?: 'constructor_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "constructor_standings" */
export type Constructor_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** columns and relationships of "constructors" */
export type Constructors = {
  __typename?: 'constructors';
  color?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "constructors" */
export type ConstructorsConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "constructors" */
export type ConstructorsDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** aggregated selection of "constructors" */
export type Constructors_Aggregate = {
  __typename?: 'constructors_aggregate';
  aggregate?: Maybe<Constructors_Aggregate_Fields>;
  nodes: Array<Constructors>;
};

/** aggregate fields of "constructors" */
export type Constructors_Aggregate_Fields = {
  __typename?: 'constructors_aggregate_fields';
  avg?: Maybe<Constructors_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Constructors_Max_Fields>;
  min?: Maybe<Constructors_Min_Fields>;
  stddev?: Maybe<Constructors_Stddev_Fields>;
  stddev_pop?: Maybe<Constructors_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Constructors_Stddev_Samp_Fields>;
  sum?: Maybe<Constructors_Sum_Fields>;
  var_pop?: Maybe<Constructors_Var_Pop_Fields>;
  var_samp?: Maybe<Constructors_Var_Samp_Fields>;
  variance?: Maybe<Constructors_Variance_Fields>;
};

/** aggregate fields of "constructors" */
export type Constructors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Constructors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Constructors_Avg_Fields = {
  __typename?: 'constructors_avg_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "constructors". All fields are combined with a logical 'AND'. */
export type Constructors_Bool_Exp = {
  _and?: InputMaybe<Array<Constructors_Bool_Exp>>;
  _not?: InputMaybe<Constructors_Bool_Exp>;
  _or?: InputMaybe<Array<Constructors_Bool_Exp>>;
  color?: InputMaybe<String_Comparison_Exp>;
  constructor_standings?: InputMaybe<Constructor_Standings_Bool_Exp>;
  constructor_standings_aggregate?: InputMaybe<Constructor_Standings_Aggregate_Bool_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  engine?: InputMaybe<String_Comparison_Exp>;
  ergast_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  start_year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "constructors" */
export enum Constructors_Constraint {
  /** unique or primary key constraint on columns "id" */
  ConstructorsPkey = 'constructors_pkey',
}

/** input type for incrementing numeric columns in table "constructors" */
export type Constructors_Inc_Input = {
  start_year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "constructors" */
export type Constructors_Insert_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  constructor_standings?: InputMaybe<Constructor_Standings_Arr_Rel_Insert_Input>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Constructors_Max_Fields = {
  __typename?: 'constructors_max_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Constructors_Min_Fields = {
  __typename?: 'constructors_min_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "constructors" */
export type Constructors_Mutation_Response = {
  __typename?: 'constructors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Constructors>;
};

/** input type for inserting object relation for remote table "constructors" */
export type Constructors_Obj_Rel_Insert_Input = {
  data: Constructors_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** on_conflict condition type for table "constructors" */
export type Constructors_On_Conflict = {
  constraint: Constructors_Constraint;
  update_columns?: Array<Constructors_Update_Column>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

/** Ordering options when selecting data from "constructors". */
export type Constructors_Order_By = {
  color?: InputMaybe<Order_By>;
  constructor_standings_aggregate?: InputMaybe<Constructor_Standings_Aggregate_Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  engine?: InputMaybe<Order_By>;
  ergast_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  start_year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: constructors */
export type Constructors_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "constructors" */
export enum Constructors_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  Engine = 'engine',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  StartYear = 'start_year',
}

/** input type for updating data in table "constructors" */
export type Constructors_Set_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Constructors_Stddev_Fields = {
  __typename?: 'constructors_stddev_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Constructors_Stddev_Pop_Fields = {
  __typename?: 'constructors_stddev_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Constructors_Stddev_Samp_Fields = {
  __typename?: 'constructors_stddev_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "constructors" */
export type Constructors_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Constructors_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Constructors_Stream_Cursor_Value_Input = {
  color?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructors_Sum_Fields = {
  __typename?: 'constructors_sum_fields';
  start_year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "constructors" */
export enum Constructors_Update_Column {
  /** column name */
  Color = 'color',
  /** column name */
  Engine = 'engine',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  StartYear = 'start_year',
}

export type Constructors_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Constructors_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Constructors_Set_Input>;
  /** filter the rows which have to be updated */
  where: Constructors_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Constructors_Var_Pop_Fields = {
  __typename?: 'constructors_var_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Constructors_Var_Samp_Fields = {
  __typename?: 'constructors_var_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Constructors_Variance_Fields = {
  __typename?: 'constructors_variance_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** columns and relationships of "driver_sessions" */
export type Driver_Sessions = {
  __typename?: 'driver_sessions';
  /** An object relationship */
  constructorByConstructorId?: Maybe<Constructors>;
  constructor_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver?: Maybe<Drivers>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "driver_sessions" */
export type Driver_SessionsTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "driver_sessions" */
export type Driver_Sessions_Aggregate = {
  __typename?: 'driver_sessions_aggregate';
  aggregate?: Maybe<Driver_Sessions_Aggregate_Fields>;
  nodes: Array<Driver_Sessions>;
};

export type Driver_Sessions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp_Count>;
};

export type Driver_Sessions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Driver_Sessions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "driver_sessions" */
export type Driver_Sessions_Aggregate_Fields = {
  __typename?: 'driver_sessions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Driver_Sessions_Max_Fields>;
  min?: Maybe<Driver_Sessions_Min_Fields>;
};

/** aggregate fields of "driver_sessions" */
export type Driver_Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "driver_sessions" */
export type Driver_Sessions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Driver_Sessions_Max_Order_By>;
  min?: InputMaybe<Driver_Sessions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "driver_sessions" */
export type Driver_Sessions_Arr_Rel_Insert_Input = {
  data: Array<Driver_Sessions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "driver_sessions". All fields are combined with a logical 'AND'. */
export type Driver_Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  _not?: InputMaybe<Driver_Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  constructorByConstructorId?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  driver?: InputMaybe<Drivers_Bool_Exp>;
  driver_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Laps_Bool_Exp>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Bool_Exp>;
  results?: InputMaybe<Results_Bool_Exp>;
  results_aggregate?: InputMaybe<Results_Aggregate_Bool_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "driver_sessions" */
export enum Driver_Sessions_Constraint {
  /** unique or primary key constraint on columns "id" */
  DriverSessionsPkey = 'driver_sessions_pkey',
}

/** input type for inserting data into table "driver_sessions" */
export type Driver_Sessions_Insert_Input = {
  constructorByConstructorId?: InputMaybe<Constructors_Obj_Rel_Insert_Input>;
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver?: InputMaybe<Drivers_Obj_Rel_Insert_Input>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  laps?: InputMaybe<Laps_Arr_Rel_Insert_Input>;
  results?: InputMaybe<Results_Arr_Rel_Insert_Input>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  telemetries?: InputMaybe<Telemetry_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Driver_Sessions_Max_Fields = {
  __typename?: 'driver_sessions_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "driver_sessions" */
export type Driver_Sessions_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Sessions_Min_Fields = {
  __typename?: 'driver_sessions_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "driver_sessions" */
export type Driver_Sessions_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "driver_sessions" */
export type Driver_Sessions_Mutation_Response = {
  __typename?: 'driver_sessions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Driver_Sessions>;
};

/** input type for inserting object relation for remote table "driver_sessions" */
export type Driver_Sessions_Obj_Rel_Insert_Input = {
  data: Driver_Sessions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** on_conflict condition type for table "driver_sessions" */
export type Driver_Sessions_On_Conflict = {
  constraint: Driver_Sessions_Constraint;
  update_columns?: Array<Driver_Sessions_Update_Column>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "driver_sessions". */
export type Driver_Sessions_Order_By = {
  constructorByConstructorId?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  driver?: InputMaybe<Drivers_Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Order_By>;
  results_aggregate?: InputMaybe<Results_Aggregate_Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
};

/** primary key columns input for table: driver_sessions */
export type Driver_Sessions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "driver_sessions" */
export enum Driver_Sessions_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  SessionId = 'session_id',
}

/** input type for updating data in table "driver_sessions" */
export type Driver_Sessions_Set_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "driver_sessions" */
export type Driver_Sessions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Driver_Sessions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Driver_Sessions_Stream_Cursor_Value_Input = {
  constructor_id?: InputMaybe<Scalars['String']['input']>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "driver_sessions" */
export enum Driver_Sessions_Update_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  SessionId = 'session_id',
}

export type Driver_Sessions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Driver_Sessions_Bool_Exp;
};

/** columns and relationships of "driver_standings" */
export type Driver_Standings = {
  __typename?: 'driver_standings';
  /** An object relationship */
  driver?: Maybe<Drivers>;
  driver_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "driver_standings" */
export type Driver_Standings_Aggregate = {
  __typename?: 'driver_standings_aggregate';
  aggregate?: Maybe<Driver_Standings_Aggregate_Fields>;
  nodes: Array<Driver_Standings>;
};

export type Driver_Standings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Driver_Standings_Aggregate_Bool_Exp_Count>;
};

export type Driver_Standings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Driver_Standings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "driver_standings" */
export type Driver_Standings_Aggregate_Fields = {
  __typename?: 'driver_standings_aggregate_fields';
  avg?: Maybe<Driver_Standings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Driver_Standings_Max_Fields>;
  min?: Maybe<Driver_Standings_Min_Fields>;
  stddev?: Maybe<Driver_Standings_Stddev_Fields>;
  stddev_pop?: Maybe<Driver_Standings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Driver_Standings_Stddev_Samp_Fields>;
  sum?: Maybe<Driver_Standings_Sum_Fields>;
  var_pop?: Maybe<Driver_Standings_Var_Pop_Fields>;
  var_samp?: Maybe<Driver_Standings_Var_Samp_Fields>;
  variance?: Maybe<Driver_Standings_Variance_Fields>;
};

/** aggregate fields of "driver_standings" */
export type Driver_Standings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "driver_standings" */
export type Driver_Standings_Aggregate_Order_By = {
  avg?: InputMaybe<Driver_Standings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Driver_Standings_Max_Order_By>;
  min?: InputMaybe<Driver_Standings_Min_Order_By>;
  stddev?: InputMaybe<Driver_Standings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Driver_Standings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Driver_Standings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Driver_Standings_Sum_Order_By>;
  var_pop?: InputMaybe<Driver_Standings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Driver_Standings_Var_Samp_Order_By>;
  variance?: InputMaybe<Driver_Standings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "driver_standings" */
export type Driver_Standings_Arr_Rel_Insert_Input = {
  data: Array<Driver_Standings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** aggregate avg on columns */
export type Driver_Standings_Avg_Fields = {
  __typename?: 'driver_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "driver_standings" */
export type Driver_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "driver_standings". All fields are combined with a logical 'AND'. */
export type Driver_Standings_Bool_Exp = {
  _and?: InputMaybe<Array<Driver_Standings_Bool_Exp>>;
  _not?: InputMaybe<Driver_Standings_Bool_Exp>;
  _or?: InputMaybe<Array<Driver_Standings_Bool_Exp>>;
  driver?: InputMaybe<Drivers_Bool_Exp>;
  driver_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "driver_standings" */
export enum Driver_Standings_Constraint {
  /** unique or primary key constraint on columns "id" */
  DriverStandingsPkey = 'driver_standings_pkey',
}

/** input type for incrementing numeric columns in table "driver_standings" */
export type Driver_Standings_Inc_Input = {
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "driver_standings" */
export type Driver_Standings_Insert_Input = {
  driver?: InputMaybe<Drivers_Obj_Rel_Insert_Input>;
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Driver_Standings_Max_Fields = {
  __typename?: 'driver_standings_max_fields';
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "driver_standings" */
export type Driver_Standings_Max_Order_By = {
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Standings_Min_Fields = {
  __typename?: 'driver_standings_min_fields';
  driver_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "driver_standings" */
export type Driver_Standings_Min_Order_By = {
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "driver_standings" */
export type Driver_Standings_Mutation_Response = {
  __typename?: 'driver_standings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Driver_Standings>;
};

/** on_conflict condition type for table "driver_standings" */
export type Driver_Standings_On_Conflict = {
  constraint: Driver_Standings_Constraint;
  update_columns?: Array<Driver_Standings_Update_Column>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** Ordering options when selecting data from "driver_standings". */
export type Driver_Standings_Order_By = {
  driver?: InputMaybe<Drivers_Order_By>;
  driver_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** primary key columns input for table: driver_standings */
export type Driver_Standings_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "driver_standings" */
export enum Driver_Standings_Select_Column {
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** input type for updating data in table "driver_standings" */
export type Driver_Standings_Set_Input = {
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Driver_Standings_Stddev_Fields = {
  __typename?: 'driver_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Driver_Standings_Stddev_Pop_Fields = {
  __typename?: 'driver_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Driver_Standings_Stddev_Samp_Fields = {
  __typename?: 'driver_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "driver_standings" */
export type Driver_Standings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Driver_Standings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Driver_Standings_Stream_Cursor_Value_Input = {
  driver_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Driver_Standings_Sum_Fields = {
  __typename?: 'driver_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "driver_standings" */
export type Driver_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** update columns of table "driver_standings" */
export enum Driver_Standings_Update_Column {
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

export type Driver_Standings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Driver_Standings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Driver_Standings_Var_Pop_Fields = {
  __typename?: 'driver_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "driver_standings" */
export type Driver_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Driver_Standings_Var_Samp_Fields = {
  __typename?: 'driver_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "driver_standings" */
export type Driver_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Driver_Standings_Variance_Fields = {
  __typename?: 'driver_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "driver_standings" */
export type Driver_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** columns and relationships of "drivers" */
export type Drivers = {
  __typename?: 'drivers';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** columns and relationships of "drivers" */
export type DriversDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

/** aggregated selection of "drivers" */
export type Drivers_Aggregate = {
  __typename?: 'drivers_aggregate';
  aggregate?: Maybe<Drivers_Aggregate_Fields>;
  nodes: Array<Drivers>;
};

/** aggregate fields of "drivers" */
export type Drivers_Aggregate_Fields = {
  __typename?: 'drivers_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Drivers_Max_Fields>;
  min?: Maybe<Drivers_Min_Fields>;
};

/** aggregate fields of "drivers" */
export type Drivers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drivers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "drivers". All fields are combined with a logical 'AND'. */
export type Drivers_Bool_Exp = {
  _and?: InputMaybe<Array<Drivers_Bool_Exp>>;
  _not?: InputMaybe<Drivers_Bool_Exp>;
  _or?: InputMaybe<Array<Drivers_Bool_Exp>>;
  abbreviation?: InputMaybe<String_Comparison_Exp>;
  broadcast_name?: InputMaybe<String_Comparison_Exp>;
  country_code?: InputMaybe<String_Comparison_Exp>;
  date_of_birth?: InputMaybe<String_Comparison_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  driver_standings?: InputMaybe<Driver_Standings_Bool_Exp>;
  driver_standings_aggregate?: InputMaybe<Driver_Standings_Aggregate_Bool_Exp>;
  ergast_id?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  headshot_url?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  number?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "drivers" */
export enum Drivers_Constraint {
  /** unique or primary key constraint on columns "id" */
  DriversPkey = 'drivers_pkey',
}

/** input type for inserting data into table "drivers" */
export type Drivers_Insert_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  driver_standings?: InputMaybe<Driver_Standings_Arr_Rel_Insert_Input>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Drivers_Max_Fields = {
  __typename?: 'drivers_max_fields';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Drivers_Min_Fields = {
  __typename?: 'drivers_min_fields';
  abbreviation?: Maybe<Scalars['String']['output']>;
  broadcast_name?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  date_of_birth?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  headshot_url?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "drivers" */
export type Drivers_Mutation_Response = {
  __typename?: 'drivers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Drivers>;
};

/** input type for inserting object relation for remote table "drivers" */
export type Drivers_Obj_Rel_Insert_Input = {
  data: Drivers_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** on_conflict condition type for table "drivers" */
export type Drivers_On_Conflict = {
  constraint: Drivers_Constraint;
  update_columns?: Array<Drivers_Update_Column>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

/** Ordering options when selecting data from "drivers". */
export type Drivers_Order_By = {
  abbreviation?: InputMaybe<Order_By>;
  broadcast_name?: InputMaybe<Order_By>;
  country_code?: InputMaybe<Order_By>;
  date_of_birth?: InputMaybe<Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  driver_standings_aggregate?: InputMaybe<Driver_Standings_Aggregate_Order_By>;
  ergast_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  headshot_url?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
};

/** primary key columns input for table: drivers */
export type Drivers_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "drivers" */
export enum Drivers_Select_Column {
  /** column name */
  Abbreviation = 'abbreviation',
  /** column name */
  BroadcastName = 'broadcast_name',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  HeadshotUrl = 'headshot_url',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  Number = 'number',
}

/** input type for updating data in table "drivers" */
export type Drivers_Set_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "drivers" */
export type Drivers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Drivers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Drivers_Stream_Cursor_Value_Input = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  broadcast_name?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  ergast_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  headshot_url?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "drivers" */
export enum Drivers_Update_Column {
  /** column name */
  Abbreviation = 'abbreviation',
  /** column name */
  BroadcastName = 'broadcast_name',
  /** column name */
  CountryCode = 'country_code',
  /** column name */
  DateOfBirth = 'date_of_birth',
  /** column name */
  ErgastId = 'ergast_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  HeadshotUrl = 'headshot_url',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  Number = 'number',
}

export type Drivers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Drivers_Set_Input>;
  /** filter the rows which have to be updated */
  where: Drivers_Bool_Exp;
};

/** Boolean expression to compare columns of type "event_format_choices". All fields are combined with logical 'AND'. */
export type Event_Format_Choices_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['event_format_choices']['input']>;
  _gt?: InputMaybe<Scalars['event_format_choices']['input']>;
  _gte?: InputMaybe<Scalars['event_format_choices']['input']>;
  _in?: InputMaybe<Array<Scalars['event_format_choices']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['event_format_choices']['input']>;
  _lte?: InputMaybe<Scalars['event_format_choices']['input']>;
  _neq?: InputMaybe<Scalars['event_format_choices']['input']>;
  _nin?: InputMaybe<Array<Scalars['event_format_choices']['input']>>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  f1_api_support?: Maybe<Scalars['Boolean']['output']>;
  format?: Maybe<Scalars['event_format_choices']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  year?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "events" */
export type EventsSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "events" */
export type EventsSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  f1_api_support?: InputMaybe<Boolean_Comparison_Exp>;
  format?: InputMaybe<Event_Format_Choices_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  official_name?: InputMaybe<String_Comparison_Exp>;
  round_number?: InputMaybe<Int_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "id" */
  EventsPkey = 'events_pkey',
}

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['event_format_choices']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  sessions?: InputMaybe<Sessions_Arr_Rel_Insert_Input>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['event_format_choices']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['event_format_choices']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  f1_api_support?: InputMaybe<Order_By>;
  format?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  Date = 'date',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  OfficialName = 'official_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Year = 'year',
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['event_format_choices']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['event_format_choices']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  official_name?: InputMaybe<Scalars['String']['input']>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  Country = 'country',
  /** column name */
  Date = 'date',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Format = 'format',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  OfficialName = 'official_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Year = 'year',
}

export type Events_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Events_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "laps" */
export type Laps = {
  __typename?: 'laps';
  compound?: Maybe<Scalars['tyre_compounds']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  fresh_tyre?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  is_accurate?: Maybe<Scalars['Boolean']['output']>;
  is_personal_best?: Maybe<Scalars['Boolean']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "laps" */
export type Laps_Aggregate = {
  __typename?: 'laps_aggregate';
  aggregate?: Maybe<Laps_Aggregate_Fields>;
  nodes: Array<Laps>;
};

export type Laps_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Laps_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Laps_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Laps_Aggregate_Bool_Exp_Count>;
};

export type Laps_Aggregate_Bool_Exp_Bool_And = {
  arguments: Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Laps_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Laps_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Laps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Laps_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "laps" */
export type Laps_Aggregate_Fields = {
  __typename?: 'laps_aggregate_fields';
  avg?: Maybe<Laps_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Laps_Max_Fields>;
  min?: Maybe<Laps_Min_Fields>;
  stddev?: Maybe<Laps_Stddev_Fields>;
  stddev_pop?: Maybe<Laps_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Laps_Stddev_Samp_Fields>;
  sum?: Maybe<Laps_Sum_Fields>;
  var_pop?: Maybe<Laps_Var_Pop_Fields>;
  var_samp?: Maybe<Laps_Var_Samp_Fields>;
  variance?: Maybe<Laps_Variance_Fields>;
};

/** aggregate fields of "laps" */
export type Laps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Laps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "laps" */
export type Laps_Aggregate_Order_By = {
  avg?: InputMaybe<Laps_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Laps_Max_Order_By>;
  min?: InputMaybe<Laps_Min_Order_By>;
  stddev?: InputMaybe<Laps_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Laps_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Laps_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Laps_Sum_Order_By>;
  var_pop?: InputMaybe<Laps_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Laps_Var_Samp_Order_By>;
  variance?: InputMaybe<Laps_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "laps" */
export type Laps_Arr_Rel_Insert_Input = {
  data: Array<Laps_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** aggregate avg on columns */
export type Laps_Avg_Fields = {
  __typename?: 'laps_avg_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "laps" */
export type Laps_Avg_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "laps". All fields are combined with a logical 'AND'. */
export type Laps_Bool_Exp = {
  _and?: InputMaybe<Array<Laps_Bool_Exp>>;
  _not?: InputMaybe<Laps_Bool_Exp>;
  _or?: InputMaybe<Array<Laps_Bool_Exp>>;
  compound?: InputMaybe<Tyre_Compounds_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  fresh_tyre?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  is_accurate?: InputMaybe<Boolean_Comparison_Exp>;
  is_personal_best?: InputMaybe<Boolean_Comparison_Exp>;
  lap_number?: InputMaybe<Int_Comparison_Exp>;
  lap_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitin_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitout_time?: InputMaybe<Bigint_Comparison_Exp>;
  sector1?: InputMaybe<Bigint_Comparison_Exp>;
  sector1_ts?: InputMaybe<Bigint_Comparison_Exp>;
  sector2?: InputMaybe<Bigint_Comparison_Exp>;
  sector2_ts?: InputMaybe<Bigint_Comparison_Exp>;
  sector3?: InputMaybe<Bigint_Comparison_Exp>;
  sector3_ts?: InputMaybe<Bigint_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  speed_trap_fastest_lap?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_sector1?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_sector2?: InputMaybe<Numeric_Comparison_Exp>;
  speed_trap_straight?: InputMaybe<Numeric_Comparison_Exp>;
  stint?: InputMaybe<Int_Comparison_Exp>;
  tyre_life?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "laps" */
export enum Laps_Constraint {
  /** unique or primary key constraint on columns "id" */
  LapsPkey = 'laps_pkey',
}

/** input type for incrementing numeric columns in table "laps" */
export type Laps_Inc_Input = {
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "laps" */
export type Laps_Insert_Input = {
  compound?: InputMaybe<Scalars['tyre_compounds']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Laps_Max_Fields = {
  __typename?: 'laps_max_fields';
  compound?: Maybe<Scalars['tyre_compounds']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "laps" */
export type Laps_Max_Order_By = {
  compound?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Laps_Min_Fields = {
  __typename?: 'laps_min_fields';
  compound?: Maybe<Scalars['tyre_compounds']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "laps" */
export type Laps_Min_Order_By = {
  compound?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "laps" */
export type Laps_Mutation_Response = {
  __typename?: 'laps_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Laps>;
};

/** on_conflict condition type for table "laps" */
export type Laps_On_Conflict = {
  constraint: Laps_Constraint;
  update_columns?: Array<Laps_Update_Column>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** Ordering options when selecting data from "laps". */
export type Laps_Order_By = {
  compound?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  fresh_tyre?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_accurate?: InputMaybe<Order_By>;
  is_personal_best?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** primary key columns input for table: laps */
export type Laps_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "laps" */
export enum Laps_Select_Column {
  /** column name */
  Compound = 'compound',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  Id = 'id',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
  /** column name */
  LapNumber = 'lap_number',
  /** column name */
  LapTime = 'lap_time',
  /** column name */
  PitinTime = 'pitin_time',
  /** column name */
  PitoutTime = 'pitout_time',
  /** column name */
  Sector1 = 'sector1',
  /** column name */
  Sector1Ts = 'sector1_ts',
  /** column name */
  Sector2 = 'sector2',
  /** column name */
  Sector2Ts = 'sector2_ts',
  /** column name */
  Sector3 = 'sector3',
  /** column name */
  Sector3Ts = 'sector3_ts',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SpeedTrapFastestLap = 'speed_trap_fastest_lap',
  /** column name */
  SpeedTrapSector1 = 'speed_trap_sector1',
  /** column name */
  SpeedTrapSector2 = 'speed_trap_sector2',
  /** column name */
  SpeedTrapStraight = 'speed_trap_straight',
  /** column name */
  Stint = 'stint',
  /** column name */
  TyreLife = 'tyre_life',
}

/** select "laps_aggregate_bool_exp_bool_and_arguments_columns" columns of table "laps" */
export enum Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
}

/** select "laps_aggregate_bool_exp_bool_or_arguments_columns" columns of table "laps" */
export enum Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
}

/** input type for updating data in table "laps" */
export type Laps_Set_Input = {
  compound?: InputMaybe<Scalars['tyre_compounds']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Laps_Stddev_Fields = {
  __typename?: 'laps_stddev_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "laps" */
export type Laps_Stddev_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Laps_Stddev_Pop_Fields = {
  __typename?: 'laps_stddev_pop_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "laps" */
export type Laps_Stddev_Pop_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Laps_Stddev_Samp_Fields = {
  __typename?: 'laps_stddev_samp_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "laps" */
export type Laps_Stddev_Samp_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "laps" */
export type Laps_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Laps_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Laps_Stream_Cursor_Value_Input = {
  compound?: InputMaybe<Scalars['tyre_compounds']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  sector1?: InputMaybe<Scalars['bigint']['input']>;
  sector1_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector2?: InputMaybe<Scalars['bigint']['input']>;
  sector2_ts?: InputMaybe<Scalars['bigint']['input']>;
  sector3?: InputMaybe<Scalars['bigint']['input']>;
  sector3_ts?: InputMaybe<Scalars['bigint']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed_trap_fastest_lap?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector1?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_sector2?: InputMaybe<Scalars['numeric']['input']>;
  speed_trap_straight?: InputMaybe<Scalars['numeric']['input']>;
  stint?: InputMaybe<Scalars['Int']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Laps_Sum_Fields = {
  __typename?: 'laps_sum_fields';
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  sector1?: Maybe<Scalars['bigint']['output']>;
  sector1_ts?: Maybe<Scalars['bigint']['output']>;
  sector2?: Maybe<Scalars['bigint']['output']>;
  sector2_ts?: Maybe<Scalars['bigint']['output']>;
  sector3?: Maybe<Scalars['bigint']['output']>;
  sector3_ts?: Maybe<Scalars['bigint']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector1?: Maybe<Scalars['numeric']['output']>;
  speed_trap_sector2?: Maybe<Scalars['numeric']['output']>;
  speed_trap_straight?: Maybe<Scalars['numeric']['output']>;
  stint?: Maybe<Scalars['Int']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "laps" */
export type Laps_Sum_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** update columns of table "laps" */
export enum Laps_Update_Column {
  /** column name */
  Compound = 'compound',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  Id = 'id',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
  /** column name */
  LapNumber = 'lap_number',
  /** column name */
  LapTime = 'lap_time',
  /** column name */
  PitinTime = 'pitin_time',
  /** column name */
  PitoutTime = 'pitout_time',
  /** column name */
  Sector1 = 'sector1',
  /** column name */
  Sector1Ts = 'sector1_ts',
  /** column name */
  Sector2 = 'sector2',
  /** column name */
  Sector2Ts = 'sector2_ts',
  /** column name */
  Sector3 = 'sector3',
  /** column name */
  Sector3Ts = 'sector3_ts',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  SpeedTrapFastestLap = 'speed_trap_fastest_lap',
  /** column name */
  SpeedTrapSector1 = 'speed_trap_sector1',
  /** column name */
  SpeedTrapSector2 = 'speed_trap_sector2',
  /** column name */
  SpeedTrapStraight = 'speed_trap_straight',
  /** column name */
  Stint = 'stint',
  /** column name */
  TyreLife = 'tyre_life',
}

export type Laps_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Laps_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Laps_Set_Input>;
  /** filter the rows which have to be updated */
  where: Laps_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Laps_Var_Pop_Fields = {
  __typename?: 'laps_var_pop_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "laps" */
export type Laps_Var_Pop_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Laps_Var_Samp_Fields = {
  __typename?: 'laps_var_samp_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "laps" */
export type Laps_Var_Samp_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Laps_Variance_Fields = {
  __typename?: 'laps_variance_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  sector1?: Maybe<Scalars['Float']['output']>;
  sector1_ts?: Maybe<Scalars['Float']['output']>;
  sector2?: Maybe<Scalars['Float']['output']>;
  sector2_ts?: Maybe<Scalars['Float']['output']>;
  sector3?: Maybe<Scalars['Float']['output']>;
  sector3_ts?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed_trap_fastest_lap?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector1?: Maybe<Scalars['Float']['output']>;
  speed_trap_sector2?: Maybe<Scalars['Float']['output']>;
  speed_trap_straight?: Maybe<Scalars['Float']['output']>;
  stint?: Maybe<Scalars['Float']['output']>;
  tyre_life?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "laps" */
export type Laps_Variance_Order_By = {
  lap_number?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  sector1?: InputMaybe<Order_By>;
  sector1_ts?: InputMaybe<Order_By>;
  sector2?: InputMaybe<Order_By>;
  sector2_ts?: InputMaybe<Order_By>;
  sector3?: InputMaybe<Order_By>;
  sector3_ts?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed_trap_fastest_lap?: InputMaybe<Order_By>;
  speed_trap_sector1?: InputMaybe<Order_By>;
  speed_trap_sector2?: InputMaybe<Order_By>;
  speed_trap_straight?: InputMaybe<Order_By>;
  stint?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "circuits" */
  delete_circuits?: Maybe<Circuits_Mutation_Response>;
  /** delete single row from the table: "circuits" */
  delete_circuits_by_pk?: Maybe<Circuits>;
  /** delete data from the table: "constructor_standings" */
  delete_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** delete single row from the table: "constructor_standings" */
  delete_constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** delete data from the table: "constructors" */
  delete_constructors?: Maybe<Constructors_Mutation_Response>;
  /** delete single row from the table: "constructors" */
  delete_constructors_by_pk?: Maybe<Constructors>;
  /** delete data from the table: "driver_sessions" */
  delete_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** delete single row from the table: "driver_sessions" */
  delete_driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** delete data from the table: "driver_standings" */
  delete_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** delete single row from the table: "driver_standings" */
  delete_driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** delete data from the table: "drivers" */
  delete_drivers?: Maybe<Drivers_Mutation_Response>;
  /** delete single row from the table: "drivers" */
  delete_drivers_by_pk?: Maybe<Drivers>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "laps" */
  delete_laps?: Maybe<Laps_Mutation_Response>;
  /** delete single row from the table: "laps" */
  delete_laps_by_pk?: Maybe<Laps>;
  /** delete data from the table: "race_control_messages" */
  delete_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** delete single row from the table: "race_control_messages" */
  delete_race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** delete data from the table: "results" */
  delete_results?: Maybe<Results_Mutation_Response>;
  /** delete single row from the table: "results" */
  delete_results_by_pk?: Maybe<Results>;
  /** delete data from the table: "sessions" */
  delete_sessions?: Maybe<Sessions_Mutation_Response>;
  /** delete single row from the table: "sessions" */
  delete_sessions_by_pk?: Maybe<Sessions>;
  /** delete data from the table: "telemetry" */
  delete_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** delete single row from the table: "telemetry" */
  delete_telemetry_by_pk?: Maybe<Telemetry>;
  /** delete data from the table: "track_status" */
  delete_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** delete single row from the table: "track_status" */
  delete_track_status_by_pk?: Maybe<Track_Status>;
  /** delete data from the table: "weather_data" */
  delete_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** delete single row from the table: "weather_data" */
  delete_weather_data_by_pk?: Maybe<Weather_Data>;
  /** insert data into the table: "circuits" */
  insert_circuits?: Maybe<Circuits_Mutation_Response>;
  /** insert a single row into the table: "circuits" */
  insert_circuits_one?: Maybe<Circuits>;
  /** insert data into the table: "constructor_standings" */
  insert_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** insert a single row into the table: "constructor_standings" */
  insert_constructor_standings_one?: Maybe<Constructor_Standings>;
  /** insert data into the table: "constructors" */
  insert_constructors?: Maybe<Constructors_Mutation_Response>;
  /** insert a single row into the table: "constructors" */
  insert_constructors_one?: Maybe<Constructors>;
  /** insert data into the table: "driver_sessions" */
  insert_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** insert a single row into the table: "driver_sessions" */
  insert_driver_sessions_one?: Maybe<Driver_Sessions>;
  /** insert data into the table: "driver_standings" */
  insert_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** insert a single row into the table: "driver_standings" */
  insert_driver_standings_one?: Maybe<Driver_Standings>;
  /** insert data into the table: "drivers" */
  insert_drivers?: Maybe<Drivers_Mutation_Response>;
  /** insert a single row into the table: "drivers" */
  insert_drivers_one?: Maybe<Drivers>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "laps" */
  insert_laps?: Maybe<Laps_Mutation_Response>;
  /** insert a single row into the table: "laps" */
  insert_laps_one?: Maybe<Laps>;
  /** insert data into the table: "race_control_messages" */
  insert_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** insert a single row into the table: "race_control_messages" */
  insert_race_control_messages_one?: Maybe<Race_Control_Messages>;
  /** insert data into the table: "results" */
  insert_results?: Maybe<Results_Mutation_Response>;
  /** insert a single row into the table: "results" */
  insert_results_one?: Maybe<Results>;
  /** insert data into the table: "sessions" */
  insert_sessions?: Maybe<Sessions_Mutation_Response>;
  /** insert a single row into the table: "sessions" */
  insert_sessions_one?: Maybe<Sessions>;
  /** insert data into the table: "telemetry" */
  insert_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** insert a single row into the table: "telemetry" */
  insert_telemetry_one?: Maybe<Telemetry>;
  /** insert data into the table: "track_status" */
  insert_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** insert a single row into the table: "track_status" */
  insert_track_status_one?: Maybe<Track_Status>;
  /** insert data into the table: "weather_data" */
  insert_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** insert a single row into the table: "weather_data" */
  insert_weather_data_one?: Maybe<Weather_Data>;
  /** update data of the table: "circuits" */
  update_circuits?: Maybe<Circuits_Mutation_Response>;
  /** update single row of the table: "circuits" */
  update_circuits_by_pk?: Maybe<Circuits>;
  /** update multiples rows of table: "circuits" */
  update_circuits_many?: Maybe<Array<Maybe<Circuits_Mutation_Response>>>;
  /** update data of the table: "constructor_standings" */
  update_constructor_standings?: Maybe<Constructor_Standings_Mutation_Response>;
  /** update single row of the table: "constructor_standings" */
  update_constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** update multiples rows of table: "constructor_standings" */
  update_constructor_standings_many?: Maybe<
    Array<Maybe<Constructor_Standings_Mutation_Response>>
  >;
  /** update data of the table: "constructors" */
  update_constructors?: Maybe<Constructors_Mutation_Response>;
  /** update single row of the table: "constructors" */
  update_constructors_by_pk?: Maybe<Constructors>;
  /** update multiples rows of table: "constructors" */
  update_constructors_many?: Maybe<
    Array<Maybe<Constructors_Mutation_Response>>
  >;
  /** update data of the table: "driver_sessions" */
  update_driver_sessions?: Maybe<Driver_Sessions_Mutation_Response>;
  /** update single row of the table: "driver_sessions" */
  update_driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** update multiples rows of table: "driver_sessions" */
  update_driver_sessions_many?: Maybe<
    Array<Maybe<Driver_Sessions_Mutation_Response>>
  >;
  /** update data of the table: "driver_standings" */
  update_driver_standings?: Maybe<Driver_Standings_Mutation_Response>;
  /** update single row of the table: "driver_standings" */
  update_driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** update multiples rows of table: "driver_standings" */
  update_driver_standings_many?: Maybe<
    Array<Maybe<Driver_Standings_Mutation_Response>>
  >;
  /** update data of the table: "drivers" */
  update_drivers?: Maybe<Drivers_Mutation_Response>;
  /** update single row of the table: "drivers" */
  update_drivers_by_pk?: Maybe<Drivers>;
  /** update multiples rows of table: "drivers" */
  update_drivers_many?: Maybe<Array<Maybe<Drivers_Mutation_Response>>>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Array<Maybe<Events_Mutation_Response>>>;
  /** update data of the table: "laps" */
  update_laps?: Maybe<Laps_Mutation_Response>;
  /** update single row of the table: "laps" */
  update_laps_by_pk?: Maybe<Laps>;
  /** update multiples rows of table: "laps" */
  update_laps_many?: Maybe<Array<Maybe<Laps_Mutation_Response>>>;
  /** update data of the table: "race_control_messages" */
  update_race_control_messages?: Maybe<Race_Control_Messages_Mutation_Response>;
  /** update single row of the table: "race_control_messages" */
  update_race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** update multiples rows of table: "race_control_messages" */
  update_race_control_messages_many?: Maybe<
    Array<Maybe<Race_Control_Messages_Mutation_Response>>
  >;
  /** update data of the table: "results" */
  update_results?: Maybe<Results_Mutation_Response>;
  /** update single row of the table: "results" */
  update_results_by_pk?: Maybe<Results>;
  /** update multiples rows of table: "results" */
  update_results_many?: Maybe<Array<Maybe<Results_Mutation_Response>>>;
  /** update data of the table: "sessions" */
  update_sessions?: Maybe<Sessions_Mutation_Response>;
  /** update single row of the table: "sessions" */
  update_sessions_by_pk?: Maybe<Sessions>;
  /** update multiples rows of table: "sessions" */
  update_sessions_many?: Maybe<Array<Maybe<Sessions_Mutation_Response>>>;
  /** update data of the table: "telemetry" */
  update_telemetry?: Maybe<Telemetry_Mutation_Response>;
  /** update single row of the table: "telemetry" */
  update_telemetry_by_pk?: Maybe<Telemetry>;
  /** update multiples rows of table: "telemetry" */
  update_telemetry_many?: Maybe<Array<Maybe<Telemetry_Mutation_Response>>>;
  /** update data of the table: "track_status" */
  update_track_status?: Maybe<Track_Status_Mutation_Response>;
  /** update single row of the table: "track_status" */
  update_track_status_by_pk?: Maybe<Track_Status>;
  /** update multiples rows of table: "track_status" */
  update_track_status_many?: Maybe<
    Array<Maybe<Track_Status_Mutation_Response>>
  >;
  /** update data of the table: "weather_data" */
  update_weather_data?: Maybe<Weather_Data_Mutation_Response>;
  /** update single row of the table: "weather_data" */
  update_weather_data_by_pk?: Maybe<Weather_Data>;
  /** update multiples rows of table: "weather_data" */
  update_weather_data_many?: Maybe<
    Array<Maybe<Weather_Data_Mutation_Response>>
  >;
};

/** mutation root */
export type Mutation_RootDelete_CircuitsArgs = {
  where: Circuits_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Circuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Constructor_StandingsArgs = {
  where: Constructor_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Constructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ConstructorsArgs = {
  where: Constructors_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Constructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Driver_SessionsArgs = {
  where: Driver_Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Driver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Driver_StandingsArgs = {
  where: Driver_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Driver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_DriversArgs = {
  where: Drivers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Drivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_LapsArgs = {
  where: Laps_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Laps_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_MessagesArgs = {
  where: Race_Control_Messages_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Race_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ResultsArgs = {
  where: Results_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Results_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_TelemetryArgs = {
  where: Telemetry_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Telemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Track_StatusArgs = {
  where: Track_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Track_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootDelete_Weather_DataArgs = {
  where: Weather_Data_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Weather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** mutation root */
export type Mutation_RootInsert_CircuitsArgs = {
  objects: Array<Circuits_Insert_Input>;
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Circuits_OneArgs = {
  object: Circuits_Insert_Input;
  on_conflict?: InputMaybe<Circuits_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructor_StandingsArgs = {
  objects: Array<Constructor_Standings_Insert_Input>;
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructor_Standings_OneArgs = {
  object: Constructor_Standings_Insert_Input;
  on_conflict?: InputMaybe<Constructor_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ConstructorsArgs = {
  objects: Array<Constructors_Insert_Input>;
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Constructors_OneArgs = {
  object: Constructors_Insert_Input;
  on_conflict?: InputMaybe<Constructors_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_SessionsArgs = {
  objects: Array<Driver_Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_Sessions_OneArgs = {
  object: Driver_Sessions_Insert_Input;
  on_conflict?: InputMaybe<Driver_Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_StandingsArgs = {
  objects: Array<Driver_Standings_Insert_Input>;
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Driver_Standings_OneArgs = {
  object: Driver_Standings_Insert_Input;
  on_conflict?: InputMaybe<Driver_Standings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DriversArgs = {
  objects: Array<Drivers_Insert_Input>;
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Drivers_OneArgs = {
  object: Drivers_Insert_Input;
  on_conflict?: InputMaybe<Drivers_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_LapsArgs = {
  objects: Array<Laps_Insert_Input>;
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Laps_OneArgs = {
  object: Laps_Insert_Input;
  on_conflict?: InputMaybe<Laps_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_MessagesArgs = {
  objects: Array<Race_Control_Messages_Insert_Input>;
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Race_Control_Messages_OneArgs = {
  object: Race_Control_Messages_Insert_Input;
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ResultsArgs = {
  objects: Array<Results_Insert_Input>;
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Results_OneArgs = {
  object: Results_Insert_Input;
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
  objects: Array<Sessions_Insert_Input>;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
  object: Sessions_Insert_Input;
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TelemetryArgs = {
  objects: Array<Telemetry_Insert_Input>;
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Telemetry_OneArgs = {
  object: Telemetry_Insert_Input;
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Track_StatusArgs = {
  objects: Array<Track_Status_Insert_Input>;
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Track_Status_OneArgs = {
  object: Track_Status_Insert_Input;
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_DataArgs = {
  objects: Array<Weather_Data_Insert_Input>;
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Weather_Data_OneArgs = {
  object: Weather_Data_Insert_Input;
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_CircuitsArgs = {
  _inc?: InputMaybe<Circuits_Inc_Input>;
  _set?: InputMaybe<Circuits_Set_Input>;
  where: Circuits_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Circuits_By_PkArgs = {
  _inc?: InputMaybe<Circuits_Inc_Input>;
  _set?: InputMaybe<Circuits_Set_Input>;
  pk_columns: Circuits_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Circuits_ManyArgs = {
  updates: Array<Circuits_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_StandingsArgs = {
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  where: Constructor_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_Standings_By_PkArgs = {
  _inc?: InputMaybe<Constructor_Standings_Inc_Input>;
  _set?: InputMaybe<Constructor_Standings_Set_Input>;
  pk_columns: Constructor_Standings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Constructor_Standings_ManyArgs = {
  updates: Array<Constructor_Standings_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ConstructorsArgs = {
  _inc?: InputMaybe<Constructors_Inc_Input>;
  _set?: InputMaybe<Constructors_Set_Input>;
  where: Constructors_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Constructors_By_PkArgs = {
  _inc?: InputMaybe<Constructors_Inc_Input>;
  _set?: InputMaybe<Constructors_Set_Input>;
  pk_columns: Constructors_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Constructors_ManyArgs = {
  updates: Array<Constructors_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_SessionsArgs = {
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  where: Driver_Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Sessions_By_PkArgs = {
  _set?: InputMaybe<Driver_Sessions_Set_Input>;
  pk_columns: Driver_Sessions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Sessions_ManyArgs = {
  updates: Array<Driver_Sessions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_StandingsArgs = {
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  where: Driver_Standings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Standings_By_PkArgs = {
  _inc?: InputMaybe<Driver_Standings_Inc_Input>;
  _set?: InputMaybe<Driver_Standings_Set_Input>;
  pk_columns: Driver_Standings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Driver_Standings_ManyArgs = {
  updates: Array<Driver_Standings_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_DriversArgs = {
  _set?: InputMaybe<Drivers_Set_Input>;
  where: Drivers_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Drivers_By_PkArgs = {
  _set?: InputMaybe<Drivers_Set_Input>;
  pk_columns: Drivers_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Drivers_ManyArgs = {
  updates: Array<Drivers_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Array<Events_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_LapsArgs = {
  _inc?: InputMaybe<Laps_Inc_Input>;
  _set?: InputMaybe<Laps_Set_Input>;
  where: Laps_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Laps_By_PkArgs = {
  _inc?: InputMaybe<Laps_Inc_Input>;
  _set?: InputMaybe<Laps_Set_Input>;
  pk_columns: Laps_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Laps_ManyArgs = {
  updates: Array<Laps_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_MessagesArgs = {
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  where: Race_Control_Messages_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_By_PkArgs = {
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  pk_columns: Race_Control_Messages_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Race_Control_Messages_ManyArgs = {
  updates: Array<Race_Control_Messages_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ResultsArgs = {
  _inc?: InputMaybe<Results_Inc_Input>;
  _set?: InputMaybe<Results_Set_Input>;
  where: Results_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Results_By_PkArgs = {
  _inc?: InputMaybe<Results_Inc_Input>;
  _set?: InputMaybe<Results_Set_Input>;
  pk_columns: Results_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Results_ManyArgs = {
  updates: Array<Results_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  where: Sessions_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
  _inc?: InputMaybe<Sessions_Inc_Input>;
  _set?: InputMaybe<Sessions_Set_Input>;
  pk_columns: Sessions_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Sessions_ManyArgs = {
  updates: Array<Sessions_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_TelemetryArgs = {
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  _set?: InputMaybe<Telemetry_Set_Input>;
  where: Telemetry_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_By_PkArgs = {
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  _set?: InputMaybe<Telemetry_Set_Input>;
  pk_columns: Telemetry_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Telemetry_ManyArgs = {
  updates: Array<Telemetry_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Track_StatusArgs = {
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  _set?: InputMaybe<Track_Status_Set_Input>;
  where: Track_Status_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Track_Status_By_PkArgs = {
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  _set?: InputMaybe<Track_Status_Set_Input>;
  pk_columns: Track_Status_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Track_Status_ManyArgs = {
  updates: Array<Track_Status_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_DataArgs = {
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  _set?: InputMaybe<Weather_Data_Set_Input>;
  where: Weather_Data_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Data_By_PkArgs = {
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  _set?: InputMaybe<Weather_Data_Set_Input>;
  pk_columns: Weather_Data_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Weather_Data_ManyArgs = {
  updates: Array<Weather_Data_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "circuits" */
  circuits: Array<Circuits>;
  /** fetch aggregated fields from the table: "circuits" */
  circuits_aggregate: Circuits_Aggregate;
  /** fetch data from the table: "circuits" using primary key columns */
  circuits_by_pk?: Maybe<Circuits>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table: "constructor_standings" using primary key columns */
  constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** fetch data from the table: "constructors" using primary key columns */
  constructors_by_pk?: Maybe<Constructors>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** fetch data from the table: "driver_sessions" using primary key columns */
  driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table: "driver_standings" using primary key columns */
  driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<Drivers>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** fetch data from the table: "laps" using primary key columns */
  laps_by_pk?: Maybe<Laps>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages" using primary key columns */
  race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table: "results" using primary key columns */
  results_by_pk?: Maybe<Results>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry" using primary key columns */
  telemetry_by_pk?: Maybe<Telemetry>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table: "track_status" using primary key columns */
  track_status_by_pk?: Maybe<Track_Status>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
  /** fetch data from the table: "weather_data" using primary key columns */
  weather_data_by_pk?: Maybe<Weather_Data>;
};

export type Query_RootCircuitsArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Query_RootCircuits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Query_RootCircuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Query_RootConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Query_RootConstructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootConstructorsArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Query_RootConstructors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Query_RootConstructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Query_RootDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Query_RootDriver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Query_RootDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Query_RootDriver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootDriversArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Query_RootDrivers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Query_RootDrivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Query_RootEvents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Query_RootLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Query_RootLaps_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Query_RootResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Query_RootResults_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Query_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTelemetryArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Query_RootTelemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Query_RootTelemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootTrack_StatusArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Query_RootTrack_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Query_RootTrack_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Query_RootWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Query_RootWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Query_RootWeather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "race_control_messages" */
export type Race_Control_Messages = {
  __typename?: 'race_control_messages';
  category?: Maybe<Scalars['race_control_messages_categories']['output']>;
  flag?: Maybe<Scalars['race_control_messages_flags']['output']>;
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['race_control_messages_scopes']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "race_control_messages" */
export type Race_Control_Messages_Aggregate = {
  __typename?: 'race_control_messages_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages>;
};

export type Race_Control_Messages_Aggregate_Bool_Exp = {
  count?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp_Count>;
};

export type Race_Control_Messages_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "race_control_messages" */
export type Race_Control_Messages_Aggregate_Fields = {
  __typename?: 'race_control_messages_aggregate_fields';
  avg?: Maybe<Race_Control_Messages_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Min_Fields>;
  stddev?: Maybe<Race_Control_Messages_Stddev_Fields>;
  stddev_pop?: Maybe<Race_Control_Messages_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Race_Control_Messages_Stddev_Samp_Fields>;
  sum?: Maybe<Race_Control_Messages_Sum_Fields>;
  var_pop?: Maybe<Race_Control_Messages_Var_Pop_Fields>;
  var_samp?: Maybe<Race_Control_Messages_Var_Samp_Fields>;
  variance?: Maybe<Race_Control_Messages_Variance_Fields>;
};

/** aggregate fields of "race_control_messages" */
export type Race_Control_Messages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "race_control_messages" */
export type Race_Control_Messages_Aggregate_Order_By = {
  avg?: InputMaybe<Race_Control_Messages_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Race_Control_Messages_Max_Order_By>;
  min?: InputMaybe<Race_Control_Messages_Min_Order_By>;
  stddev?: InputMaybe<Race_Control_Messages_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Race_Control_Messages_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Race_Control_Messages_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Race_Control_Messages_Sum_Order_By>;
  var_pop?: InputMaybe<Race_Control_Messages_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Race_Control_Messages_Var_Samp_Order_By>;
  variance?: InputMaybe<Race_Control_Messages_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "race_control_messages" */
export type Race_Control_Messages_Arr_Rel_Insert_Input = {
  data: Array<Race_Control_Messages_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Race_Control_Messages_On_Conflict>;
};

/** aggregate avg on columns */
export type Race_Control_Messages_Avg_Fields = {
  __typename?: 'race_control_messages_avg_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "race_control_messages" */
export type Race_Control_Messages_Avg_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "race_control_messages". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Bool_Exp>>;
  category?: InputMaybe<Race_Control_Messages_Categories_Comparison_Exp>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  racing_number?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Comparison_Exp>;
  sector?: InputMaybe<Numeric_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "race_control_messages_categories". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Categories_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _gt?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _gte?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _in?: InputMaybe<Array<Scalars['race_control_messages_categories']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _lte?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _neq?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  _nin?: InputMaybe<
    Array<Scalars['race_control_messages_categories']['input']>
  >;
};

/** unique or primary key constraints on table "race_control_messages" */
export enum Race_Control_Messages_Constraint {
  /** unique or primary key constraint on columns "id" */
  RaceControlMessagesPkey = 'race_control_messages_pkey',
}

/** Boolean expression to compare columns of type "race_control_messages_flags". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Flags_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _gt?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _gte?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _in?: InputMaybe<Array<Scalars['race_control_messages_flags']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _lte?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _neq?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  _nin?: InputMaybe<Array<Scalars['race_control_messages_flags']['input']>>;
};

/** input type for incrementing numeric columns in table "race_control_messages" */
export type Race_Control_Messages_Inc_Input = {
  sector?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "race_control_messages" */
export type Race_Control_Messages_Insert_Input = {
  category?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  flag?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Max_Fields = {
  __typename?: 'race_control_messages_max_fields';
  category?: Maybe<Scalars['race_control_messages_categories']['output']>;
  flag?: Maybe<Scalars['race_control_messages_flags']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['race_control_messages_scopes']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "race_control_messages" */
export type Race_Control_Messages_Max_Order_By = {
  category?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Min_Fields = {
  __typename?: 'race_control_messages_min_fields';
  category?: Maybe<Scalars['race_control_messages_categories']['output']>;
  flag?: Maybe<Scalars['race_control_messages_flags']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['race_control_messages_scopes']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "race_control_messages" */
export type Race_Control_Messages_Min_Order_By = {
  category?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "race_control_messages" */
export type Race_Control_Messages_Mutation_Response = {
  __typename?: 'race_control_messages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Race_Control_Messages>;
};

/** on_conflict condition type for table "race_control_messages" */
export type Race_Control_Messages_On_Conflict = {
  constraint: Race_Control_Messages_Constraint;
  update_columns?: Array<Race_Control_Messages_Update_Column>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** Ordering options when selecting data from "race_control_messages". */
export type Race_Control_Messages_Order_By = {
  category?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: race_control_messages */
export type Race_Control_Messages_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** Boolean expression to compare columns of type "race_control_messages_scopes". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Scopes_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _gt?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _gte?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _in?: InputMaybe<Array<Scalars['race_control_messages_scopes']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _lte?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _neq?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  _nin?: InputMaybe<Array<Scalars['race_control_messages_scopes']['input']>>;
};

/** select columns of table "race_control_messages" */
export enum Race_Control_Messages_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  RacingNumber = 'racing_number',
  /** column name */
  Scope = 'scope',
  /** column name */
  Sector = 'sector',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
}

/** input type for updating data in table "race_control_messages" */
export type Race_Control_Messages_Set_Input = {
  category?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  flag?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Race_Control_Messages_Stddev_Fields = {
  __typename?: 'race_control_messages_stddev_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Race_Control_Messages_Stddev_Pop_Fields = {
  __typename?: 'race_control_messages_stddev_pop_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Pop_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Race_Control_Messages_Stddev_Samp_Fields = {
  __typename?: 'race_control_messages_stddev_samp_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "race_control_messages" */
export type Race_Control_Messages_Stddev_Samp_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "race_control_messages" */
export type Race_Control_Messages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Stream_Cursor_Value_Input = {
  category?: InputMaybe<Scalars['race_control_messages_categories']['input']>;
  flag?: InputMaybe<Scalars['race_control_messages_flags']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['race_control_messages_scopes']['input']>;
  sector?: InputMaybe<Scalars['numeric']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Race_Control_Messages_Sum_Fields = {
  __typename?: 'race_control_messages_sum_fields';
  sector?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "race_control_messages" */
export type Race_Control_Messages_Sum_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** update columns of table "race_control_messages" */
export enum Race_Control_Messages_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Flag = 'flag',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  RacingNumber = 'racing_number',
  /** column name */
  Scope = 'scope',
  /** column name */
  Sector = 'sector',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  Status = 'status',
  /** column name */
  Time = 'time',
}

export type Race_Control_Messages_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Race_Control_Messages_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Race_Control_Messages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Race_Control_Messages_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Race_Control_Messages_Var_Pop_Fields = {
  __typename?: 'race_control_messages_var_pop_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "race_control_messages" */
export type Race_Control_Messages_Var_Pop_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Race_Control_Messages_Var_Samp_Fields = {
  __typename?: 'race_control_messages_var_samp_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "race_control_messages" */
export type Race_Control_Messages_Var_Samp_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Race_Control_Messages_Variance_Fields = {
  __typename?: 'race_control_messages_variance_fields';
  sector?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "race_control_messages" */
export type Race_Control_Messages_Variance_Order_By = {
  sector?: InputMaybe<Order_By>;
};

/** columns and relationships of "results" */
export type Results = {
  __typename?: 'results';
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** aggregated selection of "results" */
export type Results_Aggregate = {
  __typename?: 'results_aggregate';
  aggregate?: Maybe<Results_Aggregate_Fields>;
  nodes: Array<Results>;
};

export type Results_Aggregate_Bool_Exp = {
  count?: InputMaybe<Results_Aggregate_Bool_Exp_Count>;
};

export type Results_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Results_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "results" */
export type Results_Aggregate_Fields = {
  __typename?: 'results_aggregate_fields';
  avg?: Maybe<Results_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Results_Max_Fields>;
  min?: Maybe<Results_Min_Fields>;
  stddev?: Maybe<Results_Stddev_Fields>;
  stddev_pop?: Maybe<Results_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Results_Stddev_Samp_Fields>;
  sum?: Maybe<Results_Sum_Fields>;
  var_pop?: Maybe<Results_Var_Pop_Fields>;
  var_samp?: Maybe<Results_Var_Samp_Fields>;
  variance?: Maybe<Results_Variance_Fields>;
};

/** aggregate fields of "results" */
export type Results_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Results_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "results" */
export type Results_Aggregate_Order_By = {
  avg?: InputMaybe<Results_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Results_Max_Order_By>;
  min?: InputMaybe<Results_Min_Order_By>;
  stddev?: InputMaybe<Results_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Results_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Results_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Results_Sum_Order_By>;
  var_pop?: InputMaybe<Results_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Results_Var_Samp_Order_By>;
  variance?: InputMaybe<Results_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "results" */
export type Results_Arr_Rel_Insert_Input = {
  data: Array<Results_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Results_On_Conflict>;
};

/** aggregate avg on columns */
export type Results_Avg_Fields = {
  __typename?: 'results_avg_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "results" */
export type Results_Avg_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "results". All fields are combined with a logical 'AND'. */
export type Results_Bool_Exp = {
  _and?: InputMaybe<Array<Results_Bool_Exp>>;
  _not?: InputMaybe<Results_Bool_Exp>;
  _or?: InputMaybe<Array<Results_Bool_Exp>>;
  classified_position?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  finishing_position?: InputMaybe<Int_Comparison_Exp>;
  grid_position?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  q1_time?: InputMaybe<Bigint_Comparison_Exp>;
  q2_time?: InputMaybe<Bigint_Comparison_Exp>;
  q3_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_race_time?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "results" */
export enum Results_Constraint {
  /** unique or primary key constraint on columns "id" */
  ResultsPkey = 'results_pkey',
}

/** input type for incrementing numeric columns in table "results" */
export type Results_Inc_Input = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "results" */
export type Results_Insert_Input = {
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Results_Max_Fields = {
  __typename?: 'results_max_fields';
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "results" */
export type Results_Max_Order_By = {
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Results_Min_Fields = {
  __typename?: 'results_min_fields';
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "results" */
export type Results_Min_Order_By = {
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "results" */
export type Results_Mutation_Response = {
  __typename?: 'results_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Results>;
};

/** on_conflict condition type for table "results" */
export type Results_On_Conflict = {
  constraint: Results_Constraint;
  update_columns?: Array<Results_Update_Column>;
  where?: InputMaybe<Results_Bool_Exp>;
};

/** Ordering options when selecting data from "results". */
export type Results_Order_By = {
  classified_position?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** primary key columns input for table: results */
export type Results_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "results" */
export enum Results_Select_Column {
  /** column name */
  ClassifiedPosition = 'classified_position',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FinishingPosition = 'finishing_position',
  /** column name */
  GridPosition = 'grid_position',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Q1Time = 'q1_time',
  /** column name */
  Q2Time = 'q2_time',
  /** column name */
  Q3Time = 'q3_time',
  /** column name */
  Status = 'status',
  /** column name */
  TotalRaceTime = 'total_race_time',
}

/** input type for updating data in table "results" */
export type Results_Set_Input = {
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Results_Stddev_Fields = {
  __typename?: 'results_stddev_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "results" */
export type Results_Stddev_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Results_Stddev_Pop_Fields = {
  __typename?: 'results_stddev_pop_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "results" */
export type Results_Stddev_Pop_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Results_Stddev_Samp_Fields = {
  __typename?: 'results_stddev_samp_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "results" */
export type Results_Stddev_Samp_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "results" */
export type Results_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Results_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Results_Stream_Cursor_Value_Input = {
  /** This is either an integer value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  points?: InputMaybe<Scalars['numeric']['input']>;
  q1_time?: InputMaybe<Scalars['bigint']['input']>;
  q2_time?: InputMaybe<Scalars['bigint']['input']>;
  q3_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  total_race_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Results_Sum_Fields = {
  __typename?: 'results_sum_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "results" */
export type Results_Sum_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** update columns of table "results" */
export enum Results_Update_Column {
  /** column name */
  ClassifiedPosition = 'classified_position',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  FinishingPosition = 'finishing_position',
  /** column name */
  GridPosition = 'grid_position',
  /** column name */
  Id = 'id',
  /** column name */
  Points = 'points',
  /** column name */
  Q1Time = 'q1_time',
  /** column name */
  Q2Time = 'q2_time',
  /** column name */
  Q3Time = 'q3_time',
  /** column name */
  Status = 'status',
  /** column name */
  TotalRaceTime = 'total_race_time',
}

export type Results_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Results_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Results_Set_Input>;
  /** filter the rows which have to be updated */
  where: Results_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Results_Var_Pop_Fields = {
  __typename?: 'results_var_pop_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "results" */
export type Results_Var_Pop_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Results_Var_Samp_Fields = {
  __typename?: 'results_var_samp_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "results" */
export type Results_Var_Samp_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Results_Variance_Fields = {
  __typename?: 'results_variance_fields';
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Float']['output']>;
  grid_position?: Maybe<Scalars['Float']['output']>;
  points?: Maybe<Scalars['Float']['output']>;
  q1_time?: Maybe<Scalars['Float']['output']>;
  q2_time?: Maybe<Scalars['Float']['output']>;
  q3_time?: Maybe<Scalars['Float']['output']>;
  total_race_time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "results" */
export type Results_Variance_Order_By = {
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "session_name_choices". All fields are combined with logical 'AND'. */
export type Session_Name_Choices_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['session_name_choices']['input']>;
  _gt?: InputMaybe<Scalars['session_name_choices']['input']>;
  _gte?: InputMaybe<Scalars['session_name_choices']['input']>;
  _in?: InputMaybe<Array<Scalars['session_name_choices']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['session_name_choices']['input']>;
  _lte?: InputMaybe<Scalars['session_name_choices']['input']>;
  _neq?: InputMaybe<Scalars['session_name_choices']['input']>;
  _nin?: InputMaybe<Array<Scalars['session_name_choices']['input']>>;
};

/** columns and relationships of "sessions" */
export type Sessions = {
  __typename?: 'sessions';
  /** An object relationship */
  circuit?: Maybe<Circuits>;
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** An object relationship */
  event?: Maybe<Events>;
  event_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['session_name_choices']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
  /** An array relationship */
  track_statuses: Array<Track_Status>;
  /** An aggregate relationship */
  track_statuses_aggregate: Track_Status_Aggregate;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
};

/** columns and relationships of "sessions" */
export type SessionsDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsTrack_StatusesArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsTrack_Statuses_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** columns and relationships of "sessions" */
export type SessionsWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
  __typename?: 'sessions_aggregate';
  aggregate?: Maybe<Sessions_Aggregate_Fields>;
  nodes: Array<Sessions>;
};

export type Sessions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Sessions_Aggregate_Bool_Exp_Count>;
};

export type Sessions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sessions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
  __typename?: 'sessions_aggregate_fields';
  avg?: Maybe<Sessions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sessions_Max_Fields>;
  min?: Maybe<Sessions_Min_Fields>;
  stddev?: Maybe<Sessions_Stddev_Fields>;
  stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
  sum?: Maybe<Sessions_Sum_Fields>;
  var_pop?: Maybe<Sessions_Var_Pop_Fields>;
  var_samp?: Maybe<Sessions_Var_Samp_Fields>;
  variance?: Maybe<Sessions_Variance_Fields>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sessions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sessions" */
export type Sessions_Aggregate_Order_By = {
  avg?: InputMaybe<Sessions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sessions_Max_Order_By>;
  min?: InputMaybe<Sessions_Min_Order_By>;
  stddev?: InputMaybe<Sessions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Sessions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Sessions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Sessions_Sum_Order_By>;
  var_pop?: InputMaybe<Sessions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Sessions_Var_Samp_Order_By>;
  variance?: InputMaybe<Sessions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "sessions" */
export type Sessions_Arr_Rel_Insert_Input = {
  data: Array<Sessions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sessions" */
export type Sessions_Avg_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Sessions_Bool_Exp>>;
  _not?: InputMaybe<Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Sessions_Bool_Exp>>;
  circuit?: InputMaybe<Circuits_Bool_Exp>;
  circuit_id?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  driver_sessions?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Bool_Exp>;
  event?: InputMaybe<Events_Bool_Exp>;
  event_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<Session_Name_Choices_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  scheduled_laps?: InputMaybe<Int_Comparison_Exp>;
  scheduled_start_time?: InputMaybe<String_Comparison_Exp>;
  scheduled_start_time_utc?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<String_Comparison_Exp>;
  total_laps?: InputMaybe<Int_Comparison_Exp>;
  track_statuses?: InputMaybe<Track_Status_Bool_Exp>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Bool_Exp>;
  weather_data?: InputMaybe<Weather_Data_Bool_Exp>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
  /** unique or primary key constraint on columns "id" */
  SessionsPkey = 'sessions_pkey',
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
  scheduled_laps?: InputMaybe<Scalars['Int']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
  circuit?: InputMaybe<Circuits_Obj_Rel_Insert_Input>;
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  driver_sessions?: InputMaybe<Driver_Sessions_Arr_Rel_Insert_Input>;
  event?: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['session_name_choices']['input']>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Arr_Rel_Insert_Input>;
  scheduled_laps?: InputMaybe<Scalars['Int']['input']>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
  track_statuses?: InputMaybe<Track_Status_Arr_Rel_Insert_Input>;
  weather_data?: InputMaybe<Weather_Data_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields';
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['session_name_choices']['output']>;
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "sessions" */
export type Sessions_Max_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scheduled_laps?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
  __typename?: 'sessions_min_fields';
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['session_name_choices']['output']>;
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['String']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "sessions" */
export type Sessions_Min_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  scheduled_laps?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
  __typename?: 'sessions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sessions>;
};

/** input type for inserting object relation for remote table "sessions" */
export type Sessions_Obj_Rel_Insert_Input = {
  data: Sessions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sessions_On_Conflict>;
};

/** on_conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
  constraint: Sessions_Constraint;
  update_columns?: Array<Sessions_Update_Column>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  circuit?: InputMaybe<Circuits_Order_By>;
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  event?: InputMaybe<Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  scheduled_laps?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Order_By>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
  /** column name */
  CircuitId = 'circuit_id',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ScheduledLaps = 'scheduled_laps',
  /** column name */
  ScheduledStartTime = 'scheduled_start_time',
  /** column name */
  ScheduledStartTimeUtc = 'scheduled_start_time_utc',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalLaps = 'total_laps',
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['session_name_choices']['input']>;
  scheduled_laps?: InputMaybe<Scalars['Int']['input']>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sessions" */
export type Sessions_Stddev_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sessions" */
export type Sessions_Stddev_Pop_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sessions" */
export type Sessions_Stddev_Samp_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "sessions" */
export type Sessions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sessions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sessions_Stream_Cursor_Value_Input = {
  circuit_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  event_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['session_name_choices']['input']>;
  scheduled_laps?: InputMaybe<Scalars['Int']['input']>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields';
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sessions" */
export type Sessions_Sum_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
  /** column name */
  CircuitId = 'circuit_id',
  /** column name */
  Date = 'date',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ScheduledLaps = 'scheduled_laps',
  /** column name */
  ScheduledStartTime = 'scheduled_start_time',
  /** column name */
  ScheduledStartTimeUtc = 'scheduled_start_time_utc',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalLaps = 'total_laps',
}

export type Sessions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sessions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sessions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sessions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sessions" */
export type Sessions_Var_Pop_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sessions" */
export type Sessions_Var_Samp_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sessions" */
export type Sessions_Variance_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "circuits" */
  circuits: Array<Circuits>;
  /** fetch aggregated fields from the table: "circuits" */
  circuits_aggregate: Circuits_Aggregate;
  /** fetch data from the table: "circuits" using primary key columns */
  circuits_by_pk?: Maybe<Circuits>;
  /** fetch data from the table in a streaming manner: "circuits" */
  circuits_stream: Array<Circuits>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table: "constructor_standings" using primary key columns */
  constructor_standings_by_pk?: Maybe<Constructor_Standings>;
  /** fetch data from the table in a streaming manner: "constructor_standings" */
  constructor_standings_stream: Array<Constructor_Standings>;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** fetch data from the table: "constructors" using primary key columns */
  constructors_by_pk?: Maybe<Constructors>;
  /** fetch data from the table in a streaming manner: "constructors" */
  constructors_stream: Array<Constructors>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** fetch data from the table: "driver_sessions" using primary key columns */
  driver_sessions_by_pk?: Maybe<Driver_Sessions>;
  /** fetch data from the table in a streaming manner: "driver_sessions" */
  driver_sessions_stream: Array<Driver_Sessions>;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table: "driver_standings" using primary key columns */
  driver_standings_by_pk?: Maybe<Driver_Standings>;
  /** fetch data from the table in a streaming manner: "driver_standings" */
  driver_standings_stream: Array<Driver_Standings>;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<Drivers>;
  /** fetch data from the table in a streaming manner: "drivers" */
  drivers_stream: Array<Drivers>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** fetch data from the table: "laps" using primary key columns */
  laps_by_pk?: Maybe<Laps>;
  /** fetch data from the table in a streaming manner: "laps" */
  laps_stream: Array<Laps>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages" using primary key columns */
  race_control_messages_by_pk?: Maybe<Race_Control_Messages>;
  /** fetch data from the table in a streaming manner: "race_control_messages" */
  race_control_messages_stream: Array<Race_Control_Messages>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table: "results" using primary key columns */
  results_by_pk?: Maybe<Results>;
  /** fetch data from the table in a streaming manner: "results" */
  results_stream: Array<Results>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "sessions" using primary key columns */
  sessions_by_pk?: Maybe<Sessions>;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessions_stream: Array<Sessions>;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry" using primary key columns */
  telemetry_by_pk?: Maybe<Telemetry>;
  /** fetch data from the table in a streaming manner: "telemetry" */
  telemetry_stream: Array<Telemetry>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table: "track_status" using primary key columns */
  track_status_by_pk?: Maybe<Track_Status>;
  /** fetch data from the table in a streaming manner: "track_status" */
  track_status_stream: Array<Track_Status>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
  /** fetch data from the table: "weather_data" using primary key columns */
  weather_data_by_pk?: Maybe<Weather_Data>;
  /** fetch data from the table in a streaming manner: "weather_data" */
  weather_data_stream: Array<Weather_Data>;
};

export type Subscription_RootCircuitsArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootCircuits_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Circuits_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Circuits_Order_By>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootCircuits_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootCircuits_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Circuits_Stream_Cursor_Input>>;
  where?: InputMaybe<Circuits_Bool_Exp>;
};

export type Subscription_RootConstructor_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructor_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructor_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructor_Standings_Order_By>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructor_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootConstructor_Standings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Constructor_Standings_Stream_Cursor_Input>>;
  where?: InputMaybe<Constructor_Standings_Bool_Exp>;
};

export type Subscription_RootConstructorsArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootConstructors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Constructors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Constructors_Order_By>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootConstructors_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootConstructors_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Constructors_Stream_Cursor_Input>>;
  where?: InputMaybe<Constructors_Bool_Exp>;
};

export type Subscription_RootDriver_SessionsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_Sessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Sessions_Order_By>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_Sessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDriver_Sessions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Driver_Sessions_Stream_Cursor_Input>>;
  where?: InputMaybe<Driver_Sessions_Bool_Exp>;
};

export type Subscription_RootDriver_StandingsArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriver_Standings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Driver_Standings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Driver_Standings_Order_By>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriver_Standings_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDriver_Standings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Driver_Standings_Stream_Cursor_Input>>;
  where?: InputMaybe<Driver_Standings_Bool_Exp>;
};

export type Subscription_RootDriversArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootDrivers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Drivers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Drivers_Order_By>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootDrivers_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootDrivers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Drivers_Stream_Cursor_Input>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

export type Subscription_RootLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootLaps_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootLaps_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Laps_Stream_Cursor_Input>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

export type Subscription_RootRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

export type Subscription_RootResultsArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootResults_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Results_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Results_Order_By>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootResults_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootResults_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Results_Stream_Cursor_Input>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootSessions_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootSessions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sessions_Stream_Cursor_Input>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

export type Subscription_RootTelemetryArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTelemetry_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTelemetry_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

export type Subscription_RootTrack_StatusArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTrack_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Track_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Track_Status_Order_By>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTrack_Status_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootTrack_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Track_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootWeather_DataArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Subscription_RootWeather_Data_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weather_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Weather_Data_Order_By>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

export type Subscription_RootWeather_Data_By_PkArgs = {
  id: Scalars['String']['input'];
};

export type Subscription_RootWeather_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Weather_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** columns and relationships of "telemetry" */
export type Telemetry = {
  __typename?: 'telemetry';
  brake?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  source?: Maybe<Scalars['telemetry_sources']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['telemetry_car_status']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "telemetry" */
export type Telemetry_Aggregate = {
  __typename?: 'telemetry_aggregate';
  aggregate?: Maybe<Telemetry_Aggregate_Fields>;
  nodes: Array<Telemetry>;
};

export type Telemetry_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Telemetry_Aggregate_Bool_Exp_Count>;
};

export type Telemetry_Aggregate_Bool_Exp_Bool_And = {
  arguments: Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Telemetry_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Telemetry_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Telemetry_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Telemetry_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "telemetry" */
export type Telemetry_Aggregate_Fields = {
  __typename?: 'telemetry_aggregate_fields';
  avg?: Maybe<Telemetry_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Max_Fields>;
  min?: Maybe<Telemetry_Min_Fields>;
  stddev?: Maybe<Telemetry_Stddev_Fields>;
  stddev_pop?: Maybe<Telemetry_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Telemetry_Stddev_Samp_Fields>;
  sum?: Maybe<Telemetry_Sum_Fields>;
  var_pop?: Maybe<Telemetry_Var_Pop_Fields>;
  var_samp?: Maybe<Telemetry_Var_Samp_Fields>;
  variance?: Maybe<Telemetry_Variance_Fields>;
};

/** aggregate fields of "telemetry" */
export type Telemetry_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "telemetry" */
export type Telemetry_Aggregate_Order_By = {
  avg?: InputMaybe<Telemetry_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Telemetry_Max_Order_By>;
  min?: InputMaybe<Telemetry_Min_Order_By>;
  stddev?: InputMaybe<Telemetry_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Telemetry_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Telemetry_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Telemetry_Sum_Order_By>;
  var_pop?: InputMaybe<Telemetry_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Telemetry_Var_Samp_Order_By>;
  variance?: InputMaybe<Telemetry_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "telemetry" */
export type Telemetry_Arr_Rel_Insert_Input = {
  data: Array<Telemetry_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Telemetry_On_Conflict>;
};

/** aggregate avg on columns */
export type Telemetry_Avg_Fields = {
  __typename?: 'telemetry_avg_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "telemetry" */
export type Telemetry_Avg_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "telemetry". All fields are combined with a logical 'AND'. */
export type Telemetry_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Bool_Exp>>;
  brake?: InputMaybe<Boolean_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  distance?: InputMaybe<Numeric_Comparison_Exp>;
  distance_to_driver_ahead?: InputMaybe<Numeric_Comparison_Exp>;
  driver_ahead?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  drs?: InputMaybe<Int_Comparison_Exp>;
  gear?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  relative_distance?: InputMaybe<Numeric_Comparison_Exp>;
  rpm?: InputMaybe<Int_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  source?: InputMaybe<Telemetry_Sources_Comparison_Exp>;
  speed?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<Telemetry_Car_Status_Comparison_Exp>;
  throttle?: InputMaybe<Numeric_Comparison_Exp>;
  time?: InputMaybe<Bigint_Comparison_Exp>;
  x?: InputMaybe<Numeric_Comparison_Exp>;
  y?: InputMaybe<Numeric_Comparison_Exp>;
  z?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "telemetry_car_status". All fields are combined with logical 'AND'. */
export type Telemetry_Car_Status_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _gt?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _gte?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _in?: InputMaybe<Array<Scalars['telemetry_car_status']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _lte?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _neq?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  _nin?: InputMaybe<Array<Scalars['telemetry_car_status']['input']>>;
};

/** unique or primary key constraints on table "telemetry" */
export enum Telemetry_Constraint {
  /** unique or primary key constraint on columns "id" */
  TelemetryPkey = 'telemetry_pkey',
}

/** input type for incrementing numeric columns in table "telemetry" */
export type Telemetry_Inc_Input = {
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "telemetry" */
export type Telemetry_Insert_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session?: InputMaybe<Driver_Sessions_Obj_Rel_Insert_Input>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Scalars['telemetry_sources']['input']>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Telemetry_Max_Fields = {
  __typename?: 'telemetry_max_fields';
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  source?: Maybe<Scalars['telemetry_sources']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['telemetry_car_status']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "telemetry" */
export type Telemetry_Max_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Telemetry_Min_Fields = {
  __typename?: 'telemetry_min_fields';
  date?: Maybe<Scalars['String']['output']>;
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  driver_ahead?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  source?: Maybe<Scalars['telemetry_sources']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Scalars['telemetry_car_status']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "telemetry" */
export type Telemetry_Min_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "telemetry" */
export type Telemetry_Mutation_Response = {
  __typename?: 'telemetry_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Telemetry>;
};

/** on_conflict condition type for table "telemetry" */
export type Telemetry_On_Conflict = {
  constraint: Telemetry_Constraint;
  update_columns?: Array<Telemetry_Update_Column>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** Ordering options when selecting data from "telemetry". */
export type Telemetry_Order_By = {
  brake?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** primary key columns input for table: telemetry */
export type Telemetry_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "telemetry" */
export enum Telemetry_Select_Column {
  /** column name */
  Brake = 'brake',
  /** column name */
  Date = 'date',
  /** column name */
  Distance = 'distance',
  /** column name */
  DistanceToDriverAhead = 'distance_to_driver_ahead',
  /** column name */
  DriverAhead = 'driver_ahead',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Drs = 'drs',
  /** column name */
  Gear = 'gear',
  /** column name */
  Id = 'id',
  /** column name */
  RelativeDistance = 'relative_distance',
  /** column name */
  Rpm = 'rpm',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Source = 'source',
  /** column name */
  Speed = 'speed',
  /** column name */
  Status = 'status',
  /** column name */
  Throttle = 'throttle',
  /** column name */
  Time = 'time',
  /** column name */
  X = 'x',
  /** column name */
  Y = 'y',
  /** column name */
  Z = 'z',
}

/** select "telemetry_aggregate_bool_exp_bool_and_arguments_columns" columns of table "telemetry" */
export enum Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Brake = 'brake',
}

/** select "telemetry_aggregate_bool_exp_bool_or_arguments_columns" columns of table "telemetry" */
export enum Telemetry_Select_Column_Telemetry_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Brake = 'brake',
}

/** input type for updating data in table "telemetry" */
export type Telemetry_Set_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Scalars['telemetry_sources']['input']>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** Boolean expression to compare columns of type "telemetry_sources". All fields are combined with logical 'AND'. */
export type Telemetry_Sources_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _gt?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _gte?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _in?: InputMaybe<Array<Scalars['telemetry_sources']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _lte?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _neq?: InputMaybe<Scalars['telemetry_sources']['input']>;
  _nin?: InputMaybe<Array<Scalars['telemetry_sources']['input']>>;
};

/** aggregate stddev on columns */
export type Telemetry_Stddev_Fields = {
  __typename?: 'telemetry_stddev_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "telemetry" */
export type Telemetry_Stddev_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Telemetry_Stddev_Pop_Fields = {
  __typename?: 'telemetry_stddev_pop_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "telemetry" */
export type Telemetry_Stddev_Pop_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Telemetry_Stddev_Samp_Fields = {
  __typename?: 'telemetry_stddev_samp_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "telemetry" */
export type Telemetry_Stddev_Samp_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "telemetry" */
export type Telemetry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Stream_Cursor_Value_Input = {
  brake?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['String']['input']>;
  distance?: InputMaybe<Scalars['numeric']['input']>;
  distance_to_driver_ahead?: InputMaybe<Scalars['numeric']['input']>;
  driver_ahead?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  drs?: InputMaybe<Scalars['Int']['input']>;
  gear?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Scalars['telemetry_sources']['input']>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Scalars['telemetry_car_status']['input']>;
  throttle?: InputMaybe<Scalars['numeric']['input']>;
  time?: InputMaybe<Scalars['bigint']['input']>;
  x?: InputMaybe<Scalars['numeric']['input']>;
  y?: InputMaybe<Scalars['numeric']['input']>;
  z?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Telemetry_Sum_Fields = {
  __typename?: 'telemetry_sum_fields';
  distance?: Maybe<Scalars['numeric']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['numeric']['output']>;
  drs?: Maybe<Scalars['Int']['output']>;
  gear?: Maybe<Scalars['Int']['output']>;
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  speed?: Maybe<Scalars['numeric']['output']>;
  throttle?: Maybe<Scalars['numeric']['output']>;
  time?: Maybe<Scalars['bigint']['output']>;
  x?: Maybe<Scalars['numeric']['output']>;
  y?: Maybe<Scalars['numeric']['output']>;
  z?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "telemetry" */
export type Telemetry_Sum_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** update columns of table "telemetry" */
export enum Telemetry_Update_Column {
  /** column name */
  Brake = 'brake',
  /** column name */
  Date = 'date',
  /** column name */
  Distance = 'distance',
  /** column name */
  DistanceToDriverAhead = 'distance_to_driver_ahead',
  /** column name */
  DriverAhead = 'driver_ahead',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Drs = 'drs',
  /** column name */
  Gear = 'gear',
  /** column name */
  Id = 'id',
  /** column name */
  RelativeDistance = 'relative_distance',
  /** column name */
  Rpm = 'rpm',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Source = 'source',
  /** column name */
  Speed = 'speed',
  /** column name */
  Status = 'status',
  /** column name */
  Throttle = 'throttle',
  /** column name */
  Time = 'time',
  /** column name */
  X = 'x',
  /** column name */
  Y = 'y',
  /** column name */
  Z = 'z',
}

export type Telemetry_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Telemetry_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Telemetry_Set_Input>;
  /** filter the rows which have to be updated */
  where: Telemetry_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Telemetry_Var_Pop_Fields = {
  __typename?: 'telemetry_var_pop_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "telemetry" */
export type Telemetry_Var_Pop_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Telemetry_Var_Samp_Fields = {
  __typename?: 'telemetry_var_samp_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "telemetry" */
export type Telemetry_Var_Samp_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Telemetry_Variance_Fields = {
  __typename?: 'telemetry_variance_fields';
  distance?: Maybe<Scalars['Float']['output']>;
  distance_to_driver_ahead?: Maybe<Scalars['Float']['output']>;
  drs?: Maybe<Scalars['Float']['output']>;
  gear?: Maybe<Scalars['Float']['output']>;
  relative_distance?: Maybe<Scalars['Float']['output']>;
  rpm?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  speed?: Maybe<Scalars['Float']['output']>;
  throttle?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
  z?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "telemetry" */
export type Telemetry_Variance_Order_By = {
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  drs?: InputMaybe<Order_By>;
  gear?: InputMaybe<Order_By>;
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
};

/** columns and relationships of "track_status" */
export type Track_Status = {
  __typename?: 'track_status';
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "track_status" */
export type Track_Status_Aggregate = {
  __typename?: 'track_status_aggregate';
  aggregate?: Maybe<Track_Status_Aggregate_Fields>;
  nodes: Array<Track_Status>;
};

export type Track_Status_Aggregate_Bool_Exp = {
  count?: InputMaybe<Track_Status_Aggregate_Bool_Exp_Count>;
};

export type Track_Status_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Track_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Track_Status_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "track_status" */
export type Track_Status_Aggregate_Fields = {
  __typename?: 'track_status_aggregate_fields';
  avg?: Maybe<Track_Status_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Track_Status_Max_Fields>;
  min?: Maybe<Track_Status_Min_Fields>;
  stddev?: Maybe<Track_Status_Stddev_Fields>;
  stddev_pop?: Maybe<Track_Status_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Track_Status_Stddev_Samp_Fields>;
  sum?: Maybe<Track_Status_Sum_Fields>;
  var_pop?: Maybe<Track_Status_Var_Pop_Fields>;
  var_samp?: Maybe<Track_Status_Var_Samp_Fields>;
  variance?: Maybe<Track_Status_Variance_Fields>;
};

/** aggregate fields of "track_status" */
export type Track_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Track_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "track_status" */
export type Track_Status_Aggregate_Order_By = {
  avg?: InputMaybe<Track_Status_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Track_Status_Max_Order_By>;
  min?: InputMaybe<Track_Status_Min_Order_By>;
  stddev?: InputMaybe<Track_Status_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Track_Status_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Track_Status_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Track_Status_Sum_Order_By>;
  var_pop?: InputMaybe<Track_Status_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Track_Status_Var_Samp_Order_By>;
  variance?: InputMaybe<Track_Status_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "track_status" */
export type Track_Status_Arr_Rel_Insert_Input = {
  data: Array<Track_Status_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Track_Status_On_Conflict>;
};

/** aggregate avg on columns */
export type Track_Status_Avg_Fields = {
  __typename?: 'track_status_avg_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "track_status" */
export type Track_Status_Avg_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "track_status". All fields are combined with a logical 'AND'. */
export type Track_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Track_Status_Bool_Exp>>;
  _not?: InputMaybe<Track_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Track_Status_Bool_Exp>>;
  id?: InputMaybe<String_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "track_status" */
export enum Track_Status_Constraint {
  /** unique or primary key constraint on columns "id" */
  TrackStatusPkey = 'track_status_pkey',
}

/** input type for incrementing numeric columns in table "track_status" */
export type Track_Status_Inc_Input = {
  session_time?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "track_status" */
export type Track_Status_Insert_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Track_Status_Max_Fields = {
  __typename?: 'track_status_max_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "track_status" */
export type Track_Status_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Track_Status_Min_Fields = {
  __typename?: 'track_status_min_fields';
  id?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "track_status" */
export type Track_Status_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "track_status" */
export type Track_Status_Mutation_Response = {
  __typename?: 'track_status_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Track_Status>;
};

/** on_conflict condition type for table "track_status" */
export type Track_Status_On_Conflict = {
  constraint: Track_Status_Constraint;
  update_columns?: Array<Track_Status_Update_Column>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

/** Ordering options when selecting data from "track_status". */
export type Track_Status_Order_By = {
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: track_status */
export type Track_Status_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "track_status" */
export enum Track_Status_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "track_status" */
export type Track_Status_Set_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Track_Status_Stddev_Fields = {
  __typename?: 'track_status_stddev_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "track_status" */
export type Track_Status_Stddev_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Track_Status_Stddev_Pop_Fields = {
  __typename?: 'track_status_stddev_pop_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "track_status" */
export type Track_Status_Stddev_Pop_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Track_Status_Stddev_Samp_Fields = {
  __typename?: 'track_status_stddev_samp_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "track_status" */
export type Track_Status_Stddev_Samp_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "track_status" */
export type Track_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Track_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Track_Status_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Track_Status_Sum_Fields = {
  __typename?: 'track_status_sum_fields';
  session_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "track_status" */
export type Track_Status_Sum_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** update columns of table "track_status" */
export enum Track_Status_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Status = 'status',
}

export type Track_Status_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Track_Status_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Track_Status_Set_Input>;
  /** filter the rows which have to be updated */
  where: Track_Status_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Track_Status_Var_Pop_Fields = {
  __typename?: 'track_status_var_pop_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "track_status" */
export type Track_Status_Var_Pop_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Track_Status_Var_Samp_Fields = {
  __typename?: 'track_status_var_samp_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "track_status" */
export type Track_Status_Var_Samp_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Track_Status_Variance_Fields = {
  __typename?: 'track_status_variance_fields';
  session_time?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "track_status" */
export type Track_Status_Variance_Order_By = {
  session_time?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "tyre_compounds". All fields are combined with logical 'AND'. */
export type Tyre_Compounds_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _gt?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _gte?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _in?: InputMaybe<Array<Scalars['tyre_compounds']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _lte?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _neq?: InputMaybe<Scalars['tyre_compounds']['input']>;
  _nin?: InputMaybe<Array<Scalars['tyre_compounds']['input']>>;
};

/** columns and relationships of "weather_data" */
export type Weather_Data = {
  __typename?: 'weather_data';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['String']['output'];
  pressure?: Maybe<Scalars['numeric']['output']>;
  rainfall?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  session?: Maybe<Sessions>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "weather_data" */
export type Weather_Data_Aggregate = {
  __typename?: 'weather_data_aggregate';
  aggregate?: Maybe<Weather_Data_Aggregate_Fields>;
  nodes: Array<Weather_Data>;
};

export type Weather_Data_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Weather_Data_Aggregate_Bool_Exp_Count>;
};

export type Weather_Data_Aggregate_Bool_Exp_Bool_And = {
  arguments: Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Weather_Data_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Weather_Data_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Weather_Data_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Weather_Data_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "weather_data" */
export type Weather_Data_Aggregate_Fields = {
  __typename?: 'weather_data_aggregate_fields';
  avg?: Maybe<Weather_Data_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Weather_Data_Max_Fields>;
  min?: Maybe<Weather_Data_Min_Fields>;
  stddev?: Maybe<Weather_Data_Stddev_Fields>;
  stddev_pop?: Maybe<Weather_Data_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Weather_Data_Stddev_Samp_Fields>;
  sum?: Maybe<Weather_Data_Sum_Fields>;
  var_pop?: Maybe<Weather_Data_Var_Pop_Fields>;
  var_samp?: Maybe<Weather_Data_Var_Samp_Fields>;
  variance?: Maybe<Weather_Data_Variance_Fields>;
};

/** aggregate fields of "weather_data" */
export type Weather_Data_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Weather_Data_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "weather_data" */
export type Weather_Data_Aggregate_Order_By = {
  avg?: InputMaybe<Weather_Data_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Weather_Data_Max_Order_By>;
  min?: InputMaybe<Weather_Data_Min_Order_By>;
  stddev?: InputMaybe<Weather_Data_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Weather_Data_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Weather_Data_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Weather_Data_Sum_Order_By>;
  var_pop?: InputMaybe<Weather_Data_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Weather_Data_Var_Samp_Order_By>;
  variance?: InputMaybe<Weather_Data_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "weather_data" */
export type Weather_Data_Arr_Rel_Insert_Input = {
  data: Array<Weather_Data_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Weather_Data_On_Conflict>;
};

/** aggregate avg on columns */
export type Weather_Data_Avg_Fields = {
  __typename?: 'weather_data_avg_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "weather_data" */
export type Weather_Data_Avg_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "weather_data". All fields are combined with a logical 'AND'. */
export type Weather_Data_Bool_Exp = {
  _and?: InputMaybe<Array<Weather_Data_Bool_Exp>>;
  _not?: InputMaybe<Weather_Data_Bool_Exp>;
  _or?: InputMaybe<Array<Weather_Data_Bool_Exp>>;
  air_temperature?: InputMaybe<Numeric_Comparison_Exp>;
  humidity?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  pressure?: InputMaybe<Numeric_Comparison_Exp>;
  rainfall?: InputMaybe<Boolean_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  track_temperature?: InputMaybe<Numeric_Comparison_Exp>;
  wind_direction?: InputMaybe<Int_Comparison_Exp>;
  wind_speed?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "weather_data" */
export enum Weather_Data_Constraint {
  /** unique or primary key constraint on columns "id" */
  WeatherDataPkey = 'weather_data_pkey',
}

/** input type for incrementing numeric columns in table "weather_data" */
export type Weather_Data_Inc_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "weather_data" */
export type Weather_Data_Insert_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session?: InputMaybe<Sessions_Obj_Rel_Insert_Input>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Weather_Data_Max_Fields = {
  __typename?: 'weather_data_max_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "weather_data" */
export type Weather_Data_Max_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Weather_Data_Min_Fields = {
  __typename?: 'weather_data_min_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "weather_data" */
export type Weather_Data_Min_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "weather_data" */
export type Weather_Data_Mutation_Response = {
  __typename?: 'weather_data_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Weather_Data>;
};

/** on_conflict condition type for table "weather_data" */
export type Weather_Data_On_Conflict = {
  constraint: Weather_Data_Constraint;
  update_columns?: Array<Weather_Data_Update_Column>;
  where?: InputMaybe<Weather_Data_Bool_Exp>;
};

/** Ordering options when selecting data from "weather_data". */
export type Weather_Data_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  rainfall?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** primary key columns input for table: weather_data */
export type Weather_Data_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "weather_data" */
export enum Weather_Data_Select_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  Humidity = 'humidity',
  /** column name */
  Id = 'id',
  /** column name */
  Pressure = 'pressure',
  /** column name */
  Rainfall = 'rainfall',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  TrackTemperature = 'track_temperature',
  /** column name */
  WindDirection = 'wind_direction',
  /** column name */
  WindSpeed = 'wind_speed',
}

/** select "weather_data_aggregate_bool_exp_bool_and_arguments_columns" columns of table "weather_data" */
export enum Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Rainfall = 'rainfall',
}

/** select "weather_data_aggregate_bool_exp_bool_or_arguments_columns" columns of table "weather_data" */
export enum Weather_Data_Select_Column_Weather_Data_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Rainfall = 'rainfall',
}

/** input type for updating data in table "weather_data" */
export type Weather_Data_Set_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Weather_Data_Stddev_Fields = {
  __typename?: 'weather_data_stddev_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "weather_data" */
export type Weather_Data_Stddev_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Weather_Data_Stddev_Pop_Fields = {
  __typename?: 'weather_data_stddev_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "weather_data" */
export type Weather_Data_Stddev_Pop_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Weather_Data_Stddev_Samp_Fields = {
  __typename?: 'weather_data_stddev_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "weather_data" */
export type Weather_Data_Stddev_Samp_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "weather_data" */
export type Weather_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Weather_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Weather_Data_Stream_Cursor_Value_Input = {
  air_temperature?: InputMaybe<Scalars['numeric']['input']>;
  humidity?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['numeric']['input']>;
  rainfall?: InputMaybe<Scalars['Boolean']['input']>;
  session_id?: InputMaybe<Scalars['String']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  track_temperature?: InputMaybe<Scalars['numeric']['input']>;
  wind_direction?: InputMaybe<Scalars['Int']['input']>;
  wind_speed?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Weather_Data_Sum_Fields = {
  __typename?: 'weather_data_sum_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
  pressure?: Maybe<Scalars['numeric']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  track_temperature?: Maybe<Scalars['numeric']['output']>;
  wind_direction?: Maybe<Scalars['Int']['output']>;
  wind_speed?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "weather_data" */
export type Weather_Data_Sum_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** update columns of table "weather_data" */
export enum Weather_Data_Update_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  Humidity = 'humidity',
  /** column name */
  Id = 'id',
  /** column name */
  Pressure = 'pressure',
  /** column name */
  Rainfall = 'rainfall',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  TrackTemperature = 'track_temperature',
  /** column name */
  WindDirection = 'wind_direction',
  /** column name */
  WindSpeed = 'wind_speed',
}

export type Weather_Data_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Weather_Data_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Weather_Data_Set_Input>;
  /** filter the rows which have to be updated */
  where: Weather_Data_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Weather_Data_Var_Pop_Fields = {
  __typename?: 'weather_data_var_pop_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "weather_data" */
export type Weather_Data_Var_Pop_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Weather_Data_Var_Samp_Fields = {
  __typename?: 'weather_data_var_samp_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "weather_data" */
export type Weather_Data_Var_Samp_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Weather_Data_Variance_Fields = {
  __typename?: 'weather_data_variance_fields';
  air_temperature?: Maybe<Scalars['Float']['output']>;
  humidity?: Maybe<Scalars['Float']['output']>;
  pressure?: Maybe<Scalars['Float']['output']>;
  session_time?: Maybe<Scalars['Float']['output']>;
  track_temperature?: Maybe<Scalars['Float']['output']>;
  wind_direction?: Maybe<Scalars['Float']['output']>;
  wind_speed?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "weather_data" */
export type Weather_Data_Variance_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

export type GetConstructorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetConstructorsQuery = {
  __typename?: 'query_root';
  constructors: Array<{
    __typename?: 'constructors';
    name?: string | null;
    ergast_id?: string | null;
    color?: string | null;
  }>;
};

export type GetConstructorQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetConstructorQuery = {
  __typename?: 'query_root';
  constructors: Array<{
    __typename?: 'constructors';
    name?: string | null;
    color?: string | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      driver?: { __typename?: 'drivers'; full_name?: string | null } | null;
      session?: {
        __typename?: 'sessions';
        id: string;
        name?: session_name_choices | null;
        event?: {
          __typename?: 'events';
          name?: string | null;
          year?: number | null;
        } | null;
      } | null;
      results: Array<{
        __typename?: 'results';
        points?: number | null;
        classified_position?: string | null;
        grid_position?: number | null;
      }>;
    }>;
  }>;
};

export type GetDriversQueryVariables = Exact<{ [key: string]: never }>;

export type GetDriversQuery = {
  __typename?: 'query_root';
  drivers: Array<{
    __typename?: 'drivers';
    full_name?: string | null;
    ergast_id?: string | null;
    number?: string | null;
  }>;
};

export type GetSeasonsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSeasonsQuery = {
  __typename?: 'query_root';
  events: Array<{ __typename?: 'events'; year?: number | null }>;
};

export type GetSeasonEventsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;

export type GetSeasonEventsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    year?: number | null;
    id: string;
    round_number?: number | null;
    name?: string | null;
    location?: string | null;
    date?: string | null;
    country?: string | null;
    sessions: Array<{
      __typename?: 'sessions';
      name?: session_name_choices | null;
      id: string;
      scheduled_start_time_utc?: string | null;
    }>;
  }>;
};

export type GetEventDetailsQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetEventDetailsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    round_number?: number | null;
    id: string;
    official_name?: string | null;
    location?: string | null;
    country?: string | null;
    sessions: Array<{
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: session_name_choices | null;
      race_control_messages: Array<{
        __typename?: 'race_control_messages';
        flag?: race_control_messages_flags | null;
        message?: string | null;
        time?: string | null;
      }>;
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        driver?: {
          __typename?: 'drivers';
          full_name?: string | null;
          number?: string | null;
          headshot_url?: string | null;
        } | null;
        results: Array<{
          __typename?: 'results';
          grid_position?: number | null;
          finishing_position?: number | null;
          classified_position?: string | null;
        }>;
        laps: Array<{
          __typename?: 'laps';
          lap_time?: number | null;
          lap_number?: number | null;
        }>;
      }>;
    }>;
  }>;
};

export const GetConstructorsDocument = gql`
  query GetConstructors {
    constructors(distinct_on: name, where: { ergast_id: { _neq: "" } }) {
      name
      ergast_id
      color
    }
  }
`;

/**
 * __useGetConstructorsQuery__
 *
 * To run a query within a React component, call `useGetConstructorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConstructorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConstructorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConstructorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetConstructorsQuery, GetConstructorsQueryVariables>(
    GetConstructorsDocument,
    options,
  );
}
export function useGetConstructorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >(GetConstructorsDocument, options);
}
export function useGetConstructorsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetConstructorsQuery,
        GetConstructorsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetConstructorsQuery,
    GetConstructorsQueryVariables
  >(GetConstructorsDocument, options);
}
export type GetConstructorsQueryHookResult = ReturnType<
  typeof useGetConstructorsQuery
>;
export type GetConstructorsLazyQueryHookResult = ReturnType<
  typeof useGetConstructorsLazyQuery
>;
export type GetConstructorsSuspenseQueryHookResult = ReturnType<
  typeof useGetConstructorsSuspenseQuery
>;
export type GetConstructorsQueryResult = Apollo.QueryResult<
  GetConstructorsQuery,
  GetConstructorsQueryVariables
>;
export const GetConstructorDocument = gql`
  query GetConstructor($_id: String!) {
    constructors(where: { ergast_id: { _eq: $_id } }) {
      name
      color
      driver_sessions(
        order_by: { session: { event: { year: asc } } }
        where: { session: { total_laps: { _is_null: false } } }
      ) {
        driver {
          full_name
        }
        session {
          id
          name
          event {
            name
            year
          }
        }
        results {
          points
          classified_position
          grid_position
        }
      }
    }
  }
`;

/**
 * __useGetConstructorQuery__
 *
 * To run a query within a React component, call `useGetConstructorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConstructorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConstructorQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetConstructorQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetConstructorQuery,
    GetConstructorQueryVariables
  > &
    (
      | { variables: GetConstructorQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetConstructorQuery, GetConstructorQueryVariables>(
    GetConstructorDocument,
    options,
  );
}
export function useGetConstructorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetConstructorQuery,
    GetConstructorQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetConstructorQuery, GetConstructorQueryVariables>(
    GetConstructorDocument,
    options,
  );
}
export function useGetConstructorSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetConstructorQuery,
        GetConstructorQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetConstructorQuery,
    GetConstructorQueryVariables
  >(GetConstructorDocument, options);
}
export type GetConstructorQueryHookResult = ReturnType<
  typeof useGetConstructorQuery
>;
export type GetConstructorLazyQueryHookResult = ReturnType<
  typeof useGetConstructorLazyQuery
>;
export type GetConstructorSuspenseQueryHookResult = ReturnType<
  typeof useGetConstructorSuspenseQuery
>;
export type GetConstructorQueryResult = Apollo.QueryResult<
  GetConstructorQuery,
  GetConstructorQueryVariables
>;
export const GetDriversDocument = gql`
  query GetDrivers {
    drivers(
      where: { driver_sessions: { session: { date: { _iregex: "2024" } } } }
      distinct_on: full_name
      order_by: { full_name: asc }
    ) {
      full_name
      ergast_id
      number
    }
  }
`;

/**
 * __useGetDriversQuery__
 *
 * To run a query within a React component, call `useGetDriversQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriversQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriversQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriversQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetDriversQuery,
    GetDriversQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDriversQuery, GetDriversQueryVariables>(
    GetDriversDocument,
    options,
  );
}
export function useGetDriversLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDriversQuery,
    GetDriversQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDriversQuery, GetDriversQueryVariables>(
    GetDriversDocument,
    options,
  );
}
export function useGetDriversSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetDriversQuery,
        GetDriversQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetDriversQuery, GetDriversQueryVariables>(
    GetDriversDocument,
    options,
  );
}
export type GetDriversQueryHookResult = ReturnType<typeof useGetDriversQuery>;
export type GetDriversLazyQueryHookResult = ReturnType<
  typeof useGetDriversLazyQuery
>;
export type GetDriversSuspenseQueryHookResult = ReturnType<
  typeof useGetDriversSuspenseQuery
>;
export type GetDriversQueryResult = Apollo.QueryResult<
  GetDriversQuery,
  GetDriversQueryVariables
>;
export const GetSeasonsDocument = gql`
  query GetSeasons {
    events(distinct_on: year) {
      year
    }
  }
`;

/**
 * __useGetSeasonsQuery__
 *
 * To run a query within a React component, call `useGetSeasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSeasonsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(
    GetSeasonsDocument,
    options,
  );
}
export function useGetSeasonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSeasonsQuery,
    GetSeasonsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(
    GetSeasonsDocument,
    options,
  );
}
export function useGetSeasonsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSeasonsQuery,
        GetSeasonsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(
    GetSeasonsDocument,
    options,
  );
}
export type GetSeasonsQueryHookResult = ReturnType<typeof useGetSeasonsQuery>;
export type GetSeasonsLazyQueryHookResult = ReturnType<
  typeof useGetSeasonsLazyQuery
>;
export type GetSeasonsSuspenseQueryHookResult = ReturnType<
  typeof useGetSeasonsSuspenseQuery
>;
export type GetSeasonsQueryResult = Apollo.QueryResult<
  GetSeasonsQuery,
  GetSeasonsQueryVariables
>;
export const GetSeasonEventsDocument = gql`
  query GetSeasonEvents($year: Int!) {
    events(where: { year: { _eq: $year } }) {
      year
      id
      round_number
      name
      location
      date
      country
      sessions {
        name
        id
        scheduled_start_time_utc
      }
    }
  }
`;

/**
 * __useGetSeasonEventsQuery__
 *
 * To run a query within a React component, call `useGetSeasonEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonEventsQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetSeasonEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  > &
    (
      | { variables: GetSeasonEventsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSeasonEventsQuery, GetSeasonEventsQueryVariables>(
    GetSeasonEventsDocument,
    options,
  );
}
export function useGetSeasonEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GetSeasonEventsDocument, options);
}
export function useGetSeasonEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSeasonEventsQuery,
        GetSeasonEventsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSeasonEventsQuery,
    GetSeasonEventsQueryVariables
  >(GetSeasonEventsDocument, options);
}
export type GetSeasonEventsQueryHookResult = ReturnType<
  typeof useGetSeasonEventsQuery
>;
export type GetSeasonEventsLazyQueryHookResult = ReturnType<
  typeof useGetSeasonEventsLazyQuery
>;
export type GetSeasonEventsSuspenseQueryHookResult = ReturnType<
  typeof useGetSeasonEventsSuspenseQuery
>;
export type GetSeasonEventsQueryResult = Apollo.QueryResult<
  GetSeasonEventsQuery,
  GetSeasonEventsQueryVariables
>;
export const GetEventDetailsDocument = gql`
  query GetEventDetails($_id: String!) {
    events(where: { id: { _eq: $_id } }) {
      round_number
      id
      official_name
      location
      country
      sessions {
        scheduled_start_time_utc
        name
        race_control_messages(
          where: {
            _or: [{ flag: { _eq: "GREEN" } }, { flag: { _eq: "CHEQUERED" } }]
          }
        ) {
          flag
          message
          time
        }
        driver_sessions {
          driver {
            full_name
            number
            headshot_url
          }
          results {
            grid_position
            finishing_position
            classified_position
          }
          laps(
            where: {
              is_personal_best: { _eq: true }
              is_accurate: { _eq: true }
            }
            order_by: { lap_time: asc }
          ) {
            lap_time
            lap_number
          }
        }
      }
    }
  }
`;

/**
 * __useGetEventDetailsQuery__
 *
 * To run a query within a React component, call `useGetEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventDetailsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useGetEventDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  > &
    (
      | { variables: GetEventDetailsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventDetailsQuery, GetEventDetailsQueryVariables>(
    GetEventDetailsDocument,
    options,
  );
}
export function useGetEventDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >(GetEventDetailsDocument, options);
}
export function useGetEventDetailsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEventDetailsQuery,
        GetEventDetailsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEventDetailsQuery,
    GetEventDetailsQueryVariables
  >(GetEventDetailsDocument, options);
}
export type GetEventDetailsQueryHookResult = ReturnType<
  typeof useGetEventDetailsQuery
>;
export type GetEventDetailsLazyQueryHookResult = ReturnType<
  typeof useGetEventDetailsLazyQuery
>;
export type GetEventDetailsSuspenseQueryHookResult = ReturnType<
  typeof useGetEventDetailsSuspenseQuery
>;
export type GetEventDetailsQueryResult = Apollo.QueryResult<
  GetEventDetailsQuery,
  GetEventDetailsQueryVariables
>;