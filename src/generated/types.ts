import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  numeric: { input: bigint | number; output: bigint | number };
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
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
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
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "circuits". All fields are combined with a logical 'AND'. */
export type Circuits_Bool_Exp = {
  _and?: InputMaybe<Array<Circuits_Bool_Exp>>;
  _not?: InputMaybe<Circuits_Bool_Exp>;
  _or?: InputMaybe<Array<Circuits_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  f1_key?: InputMaybe<Int_Comparison_Exp>;
  latitude?: InputMaybe<Numeric_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  longitude?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Circuits_Max_Fields = {
  __typename?: 'circuits_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Circuits_Min_Fields = {
  __typename?: 'circuits_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  f1_key?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "circuits". */
export type Circuits_Order_By = {
  country?: InputMaybe<Order_By>;
  f1_key?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
};

/** select columns of table "circuits" */
export enum Circuits_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  F1Key = 'f1_key',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Location = 'location',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
}

/** aggregate stddev on columns */
export type Circuits_Stddev_Fields = {
  __typename?: 'circuits_stddev_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Circuits_Stddev_Pop_Fields = {
  __typename?: 'circuits_stddev_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Circuits_Stddev_Samp_Fields = {
  __typename?: 'circuits_stddev_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
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
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Circuits_Sum_Fields = {
  __typename?: 'circuits_sum_fields';
  f1_key?: Maybe<Scalars['Int']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate var_pop on columns */
export type Circuits_Var_Pop_Fields = {
  __typename?: 'circuits_var_pop_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Circuits_Var_Samp_Fields = {
  __typename?: 'circuits_var_samp_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Circuits_Variance_Fields = {
  __typename?: 'circuits_variance_fields';
  f1_key?: Maybe<Scalars['Float']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "constructor_standings" */
export type Constructor_Standings = {
  __typename?: 'constructor_standings';
  /** An object relationship */
  constructorByConstructorIdSeason?: Maybe<Constructors>;
  constructor_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
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

/** aggregate avg on columns */
export type Constructor_Standings_Avg_Fields = {
  __typename?: 'constructor_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "constructor_standings" */
export type Constructor_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "constructor_standings". All fields are combined with a logical 'AND'. */
export type Constructor_Standings_Bool_Exp = {
  _and?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  _not?: InputMaybe<Constructor_Standings_Bool_Exp>;
  _or?: InputMaybe<Array<Constructor_Standings_Bool_Exp>>;
  constructorByConstructorIdSeason?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Int_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Constructor_Standings_Max_Fields = {
  __typename?: 'constructor_standings_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "constructor_standings" */
export type Constructor_Standings_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Constructor_Standings_Min_Fields = {
  __typename?: 'constructor_standings_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "constructor_standings" */
export type Constructor_Standings_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "constructor_standings". */
export type Constructor_Standings_Order_By = {
  constructorByConstructorIdSeason?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** select columns of table "constructor_standings" */
export enum Constructor_Standings_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** aggregate stddev on columns */
export type Constructor_Standings_Stddev_Fields = {
  __typename?: 'constructor_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Constructor_Standings_Stddev_Pop_Fields = {
  __typename?: 'constructor_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Constructor_Standings_Stddev_Samp_Fields = {
  __typename?: 'constructor_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
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
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructor_Standings_Sum_Fields = {
  __typename?: 'constructor_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "constructor_standings" */
export type Constructor_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Constructor_Standings_Var_Pop_Fields = {
  __typename?: 'constructor_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Constructor_Standings_Var_Samp_Fields = {
  __typename?: 'constructor_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "constructor_standings" */
export type Constructor_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Constructor_Standings_Variance_Fields = {
  __typename?: 'constructor_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "constructor_standings" */
export type Constructor_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
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
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
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
  year?: Maybe<Scalars['Float']['output']>;
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
  name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  start_year?: InputMaybe<Int_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Constructors_Max_Fields = {
  __typename?: 'constructors_max_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Constructors_Min_Fields = {
  __typename?: 'constructors_min_fields';
  color?: Maybe<Scalars['String']['output']>;
  engine?: Maybe<Scalars['String']['output']>;
  ergast_id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "constructors". */
export type Constructors_Order_By = {
  color?: InputMaybe<Order_By>;
  constructor_standings_aggregate?: InputMaybe<Constructor_Standings_Aggregate_Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  engine?: InputMaybe<Order_By>;
  ergast_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  start_year?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
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
  Name = 'name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  StartYear = 'start_year',
  /** column name */
  Year = 'year',
}

/** aggregate stddev on columns */
export type Constructors_Stddev_Fields = {
  __typename?: 'constructors_stddev_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Constructors_Stddev_Pop_Fields = {
  __typename?: 'constructors_stddev_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Constructors_Stddev_Samp_Fields = {
  __typename?: 'constructors_stddev_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
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
  name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  start_year?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Constructors_Sum_Fields = {
  __typename?: 'constructors_sum_fields';
  start_year?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Constructors_Var_Pop_Fields = {
  __typename?: 'constructors_var_pop_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Constructors_Var_Samp_Fields = {
  __typename?: 'constructors_var_samp_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Constructors_Variance_Fields = {
  __typename?: 'constructors_variance_fields';
  start_year?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
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

/** Boolean expression to filter rows from the table "driver_sessions". All fields are combined with a logical 'AND'. */
export type Driver_Sessions_Bool_Exp = {
  _and?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  _not?: InputMaybe<Driver_Sessions_Bool_Exp>;
  _or?: InputMaybe<Array<Driver_Sessions_Bool_Exp>>;
  constructorByConstructorId?: InputMaybe<Constructors_Bool_Exp>;
  constructor_id?: InputMaybe<String_Comparison_Exp>;
  driver?: InputMaybe<Drivers_Bool_Exp>;
  driver_id?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Laps_Bool_Exp>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Bool_Exp>;
  results?: InputMaybe<Results_Bool_Exp>;
  results_aggregate?: InputMaybe<Results_Aggregate_Bool_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Driver_Sessions_Max_Fields = {
  __typename?: 'driver_sessions_max_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "driver_sessions" */
export type Driver_Sessions_Max_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Sessions_Min_Fields = {
  __typename?: 'driver_sessions_min_fields';
  constructor_id?: Maybe<Scalars['String']['output']>;
  driver_id?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "driver_sessions" */
export type Driver_Sessions_Min_Order_By = {
  constructor_id?: InputMaybe<Order_By>;
  driver_id?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "driver_sessions". */
export type Driver_Sessions_Order_By = {
  constructorByConstructorId?: InputMaybe<Constructors_Order_By>;
  constructor_id?: InputMaybe<Order_By>;
  driver?: InputMaybe<Drivers_Order_By>;
  driver_id?: InputMaybe<Order_By>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Order_By>;
  results_aggregate?: InputMaybe<Results_Aggregate_Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
};

/** select columns of table "driver_sessions" */
export enum Driver_Sessions_Select_Column {
  /** column name */
  ConstructorId = 'constructor_id',
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  SessionId = 'session_id',
}

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
  session_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "driver_standings" */
export type Driver_Standings = {
  __typename?: 'driver_standings';
  /** An object relationship */
  driver?: Maybe<Drivers>;
  driver_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
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

/** aggregate avg on columns */
export type Driver_Standings_Avg_Fields = {
  __typename?: 'driver_standings_avg_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "driver_standings" */
export type Driver_Standings_Avg_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
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
  points?: InputMaybe<Numeric_Comparison_Exp>;
  position?: InputMaybe<Int_Comparison_Exp>;
  position_text?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Int_Comparison_Exp>;
  season?: InputMaybe<Int_Comparison_Exp>;
  wins?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Driver_Standings_Max_Fields = {
  __typename?: 'driver_standings_max_fields';
  driver_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "driver_standings" */
export type Driver_Standings_Max_Order_By = {
  driver_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Driver_Standings_Min_Fields = {
  __typename?: 'driver_standings_min_fields';
  driver_id?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  position_text?: Maybe<Scalars['String']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "driver_standings" */
export type Driver_Standings_Min_Order_By = {
  driver_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "driver_standings". */
export type Driver_Standings_Order_By = {
  driver?: InputMaybe<Drivers_Order_By>;
  driver_id?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  position_text?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** select columns of table "driver_standings" */
export enum Driver_Standings_Select_Column {
  /** column name */
  DriverId = 'driver_id',
  /** column name */
  Points = 'points',
  /** column name */
  Position = 'position',
  /** column name */
  PositionText = 'position_text',
  /** column name */
  Round = 'round',
  /** column name */
  Season = 'season',
  /** column name */
  Wins = 'wins',
}

/** aggregate stddev on columns */
export type Driver_Standings_Stddev_Fields = {
  __typename?: 'driver_standings_stddev_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Driver_Standings_Stddev_Pop_Fields = {
  __typename?: 'driver_standings_stddev_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Driver_Standings_Stddev_Samp_Fields = {
  __typename?: 'driver_standings_stddev_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "driver_standings" */
export type Driver_Standings_Stddev_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
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
  points?: InputMaybe<Scalars['numeric']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_text?: InputMaybe<Scalars['String']['input']>;
  round?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  wins?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Driver_Standings_Sum_Fields = {
  __typename?: 'driver_standings_sum_fields';
  points?: Maybe<Scalars['numeric']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  round?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  wins?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "driver_standings" */
export type Driver_Standings_Sum_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Driver_Standings_Var_Pop_Fields = {
  __typename?: 'driver_standings_var_pop_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "driver_standings" */
export type Driver_Standings_Var_Pop_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Driver_Standings_Var_Samp_Fields = {
  __typename?: 'driver_standings_var_samp_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "driver_standings" */
export type Driver_Standings_Var_Samp_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
  season?: InputMaybe<Order_By>;
  wins?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Driver_Standings_Variance_Fields = {
  __typename?: 'driver_standings_variance_fields';
  points?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  round?: Maybe<Scalars['Float']['output']>;
  season?: Maybe<Scalars['Float']['output']>;
  wins?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "driver_standings" */
export type Driver_Standings_Variance_Order_By = {
  points?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
  round?: InputMaybe<Order_By>;
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
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
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
  avg?: Maybe<Drivers_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Drivers_Max_Fields>;
  min?: Maybe<Drivers_Min_Fields>;
  stddev?: Maybe<Drivers_Stddev_Fields>;
  stddev_pop?: Maybe<Drivers_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Drivers_Stddev_Samp_Fields>;
  sum?: Maybe<Drivers_Sum_Fields>;
  var_pop?: Maybe<Drivers_Var_Pop_Fields>;
  var_samp?: Maybe<Drivers_Var_Samp_Fields>;
  variance?: Maybe<Drivers_Variance_Fields>;
};

/** aggregate fields of "drivers" */
export type Drivers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Drivers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Drivers_Avg_Fields = {
  __typename?: 'drivers_avg_fields';
  year?: Maybe<Scalars['Float']['output']>;
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
  last_name?: InputMaybe<String_Comparison_Exp>;
  nationality?: InputMaybe<String_Comparison_Exp>;
  number?: InputMaybe<String_Comparison_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
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
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
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
  last_name?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
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
  last_name?: InputMaybe<Order_By>;
  nationality?: InputMaybe<Order_By>;
  number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
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
  LastName = 'last_name',
  /** column name */
  Nationality = 'nationality',
  /** column name */
  Number = 'number',
  /** column name */
  Year = 'year',
}

/** aggregate stddev on columns */
export type Drivers_Stddev_Fields = {
  __typename?: 'drivers_stddev_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Drivers_Stddev_Pop_Fields = {
  __typename?: 'drivers_stddev_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Drivers_Stddev_Samp_Fields = {
  __typename?: 'drivers_stddev_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
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
  last_name?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Drivers_Sum_Fields = {
  __typename?: 'drivers_sum_fields';
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Drivers_Var_Pop_Fields = {
  __typename?: 'drivers_var_pop_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Drivers_Var_Samp_Fields = {
  __typename?: 'drivers_var_samp_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Drivers_Variance_Fields = {
  __typename?: 'drivers_variance_fields';
  year?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_Choices = {
  __typename?: 'event_format_choices';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** An array relationship */
  schedules: Array<Schedule>;
  /** An aggregate relationship */
  schedules_aggregate: Schedule_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesSchedulesArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "event_format_choices" */
export type Event_Format_ChoicesSchedules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** aggregated selection of "event_format_choices" */
export type Event_Format_Choices_Aggregate = {
  __typename?: 'event_format_choices_aggregate';
  aggregate?: Maybe<Event_Format_Choices_Aggregate_Fields>;
  nodes: Array<Event_Format_Choices>;
};

/** aggregate fields of "event_format_choices" */
export type Event_Format_Choices_Aggregate_Fields = {
  __typename?: 'event_format_choices_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Format_Choices_Max_Fields>;
  min?: Maybe<Event_Format_Choices_Min_Fields>;
};

/** aggregate fields of "event_format_choices" */
export type Event_Format_Choices_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "event_format_choices". All fields are combined with a logical 'AND'. */
export type Event_Format_Choices_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Format_Choices_Bool_Exp>>;
  _not?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Format_Choices_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  events?: InputMaybe<Events_Bool_Exp>;
  events_aggregate?: InputMaybe<Events_Aggregate_Bool_Exp>;
  schedules?: InputMaybe<Schedule_Bool_Exp>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Event_Format_Choices_Enum {
  /** Practice 1, Practice 2, Practice 3, Qualifying, Race */
  Conventional = 'conventional',
  /** Practice 1, Qualifying, Practice 2, Sprint, Race */
  Sprint = 'sprint',
  /** Practice 1, Sprint Qualifying, Sprint, Qualifying, Race */
  SprintQualifying = 'sprint_qualifying',
  /** Practice 1, Qualifying, Sprint Shootout, Sprint, Race */
  SprintShootout = 'sprint_shootout',
  /** no fixed session order; mostly Practice sessions */
  Testing = 'testing',
}

/** Boolean expression to compare columns of type "event_format_choices_enum". All fields are combined with logical 'AND'. */
export type Event_Format_Choices_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Event_Format_Choices_Enum>;
  _in?: InputMaybe<Array<Event_Format_Choices_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Event_Format_Choices_Enum>;
  _nin?: InputMaybe<Array<Event_Format_Choices_Enum>>;
};

/** aggregate max on columns */
export type Event_Format_Choices_Max_Fields = {
  __typename?: 'event_format_choices_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Event_Format_Choices_Min_Fields = {
  __typename?: 'event_format_choices_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "event_format_choices". */
export type Event_Format_Choices_Order_By = {
  comment?: InputMaybe<Order_By>;
  events_aggregate?: InputMaybe<Events_Aggregate_Order_By>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "event_format_choices" */
export enum Event_Format_Choices_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "event_format_choices" */
export type Event_Format_Choices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Format_Choices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Format_Choices_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  event_format_choice?: Maybe<Event_Format_Choices>;
  f1_api_support?: Maybe<Scalars['Boolean']['output']>;
  format?: Maybe<Event_Format_Choices_Enum>;
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

export type Events_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Events_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Events_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Events_Aggregate_Bool_Exp_Count>;
};

export type Events_Aggregate_Bool_Exp_Bool_And = {
  arguments: Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Events_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Events_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Events_Bool_Exp>;
  predicate: Int_Comparison_Exp;
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

/** order by aggregate values of table "events" */
export type Events_Aggregate_Order_By = {
  avg?: InputMaybe<Events_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Events_Max_Order_By>;
  min?: InputMaybe<Events_Min_Order_By>;
  stddev?: InputMaybe<Events_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Events_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Events_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Events_Sum_Order_By>;
  var_pop?: InputMaybe<Events_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Events_Var_Samp_Order_By>;
  variance?: InputMaybe<Events_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "events" */
export type Events_Avg_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  date?: InputMaybe<String_Comparison_Exp>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  f1_api_support?: InputMaybe<Boolean_Comparison_Exp>;
  format?: InputMaybe<Event_Format_Choices_Enum_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  official_name?: InputMaybe<String_Comparison_Exp>;
  round_number?: InputMaybe<Int_Comparison_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "events" */
export type Events_Max_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  official_name?: Maybe<Scalars['String']['output']>;
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "events" */
export type Events_Min_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  country?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Order_By>;
  f1_api_support?: InputMaybe<Order_By>;
  format?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  official_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  year?: InputMaybe<Order_By>;
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

/** select "events_aggregate_bool_exp_bool_and_arguments_columns" columns of table "events" */
export enum Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** select "events_aggregate_bool_exp_bool_or_arguments_columns" columns of table "events" */
export enum Events_Select_Column_Events_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "events" */
export type Events_Stddev_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "events" */
export type Events_Stddev_Pop_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "events" */
export type Events_Stddev_Samp_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
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
  format?: InputMaybe<Event_Format_Choices_Enum>;
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

/** order by sum() on columns of table "events" */
export type Events_Sum_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "events" */
export type Events_Var_Pop_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "events" */
export type Events_Var_Samp_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  /** All test sessions = 0 */
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "events" */
export type Events_Variance_Order_By = {
  /** All test sessions = 0 */
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** columns and relationships of "laps" */
export type Laps = {
  __typename?: 'laps';
  compound?: Maybe<Tyre_Compounds_Enum>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  deleted_reason?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  fastf1_generated?: Maybe<Scalars['Boolean']['output']>;
  fresh_tyre?: Maybe<Scalars['Boolean']['output']>;
  is_accurate?: Maybe<Scalars['Boolean']['output']>;
  is_personal_best?: Maybe<Scalars['Boolean']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
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
  track_status?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  tyre_compound?: Maybe<Tyre_Compounds>;
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

/** aggregate avg on columns */
export type Laps_Avg_Fields = {
  __typename?: 'laps_avg_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  compound?: InputMaybe<Tyre_Compounds_Enum_Comparison_Exp>;
  deleted?: InputMaybe<Boolean_Comparison_Exp>;
  deleted_reason?: InputMaybe<String_Comparison_Exp>;
  driver_session?: InputMaybe<Driver_Sessions_Bool_Exp>;
  driver_session_id?: InputMaybe<String_Comparison_Exp>;
  fastf1_generated?: InputMaybe<Boolean_Comparison_Exp>;
  fresh_tyre?: InputMaybe<Boolean_Comparison_Exp>;
  is_accurate?: InputMaybe<Boolean_Comparison_Exp>;
  is_personal_best?: InputMaybe<Boolean_Comparison_Exp>;
  lap_number?: InputMaybe<Int_Comparison_Exp>;
  lap_start_date?: InputMaybe<String_Comparison_Exp>;
  lap_start_time?: InputMaybe<Bigint_Comparison_Exp>;
  lap_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitin_time?: InputMaybe<Bigint_Comparison_Exp>;
  pitout_time?: InputMaybe<Bigint_Comparison_Exp>;
  position?: InputMaybe<Numeric_Comparison_Exp>;
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
  track_status?: InputMaybe<String_Comparison_Exp>;
  tyre_compound?: InputMaybe<Tyre_Compounds_Bool_Exp>;
  tyre_life?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Laps_Max_Fields = {
  __typename?: 'laps_max_fields';
  deleted_reason?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
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
  track_status?: Maybe<Scalars['String']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "laps" */
export type Laps_Max_Order_By = {
  deleted_reason?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  track_status?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Laps_Min_Fields = {
  __typename?: 'laps_min_fields';
  deleted_reason?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_date?: Maybe<Scalars['String']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
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
  track_status?: Maybe<Scalars['String']['output']>;
  tyre_life?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "laps" */
export type Laps_Min_Order_By = {
  deleted_reason?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  track_status?: InputMaybe<Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "laps". */
export type Laps_Order_By = {
  compound?: InputMaybe<Order_By>;
  deleted?: InputMaybe<Order_By>;
  deleted_reason?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  fastf1_generated?: InputMaybe<Order_By>;
  fresh_tyre?: InputMaybe<Order_By>;
  is_accurate?: InputMaybe<Order_By>;
  is_personal_best?: InputMaybe<Order_By>;
  lap_number?: InputMaybe<Order_By>;
  lap_start_date?: InputMaybe<Order_By>;
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  track_status?: InputMaybe<Order_By>;
  tyre_compound?: InputMaybe<Tyre_Compounds_Order_By>;
  tyre_life?: InputMaybe<Order_By>;
};

/** select columns of table "laps" */
export enum Laps_Select_Column {
  /** column name */
  Compound = 'compound',
  /** column name */
  Deleted = 'deleted',
  /** column name */
  DeletedReason = 'deleted_reason',
  /** column name */
  DriverSessionId = 'driver_session_id',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
  /** column name */
  LapNumber = 'lap_number',
  /** column name */
  LapStartDate = 'lap_start_date',
  /** column name */
  LapStartTime = 'lap_start_time',
  /** column name */
  LapTime = 'lap_time',
  /** column name */
  PitinTime = 'pitin_time',
  /** column name */
  PitoutTime = 'pitout_time',
  /** column name */
  Position = 'position',
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
  TrackStatus = 'track_status',
  /** column name */
  TyreLife = 'tyre_life',
}

/** select "laps_aggregate_bool_exp_bool_and_arguments_columns" columns of table "laps" */
export enum Laps_Select_Column_Laps_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Deleted = 'deleted',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
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
  Deleted = 'deleted',
  /** column name */
  Fastf1Generated = 'fastf1_generated',
  /** column name */
  FreshTyre = 'fresh_tyre',
  /** column name */
  IsAccurate = 'is_accurate',
  /** column name */
  IsPersonalBest = 'is_personal_best',
}

/** aggregate stddev on columns */
export type Laps_Stddev_Fields = {
  __typename?: 'laps_stddev_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  compound?: InputMaybe<Tyre_Compounds_Enum>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_reason?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  fastf1_generated?: InputMaybe<Scalars['Boolean']['input']>;
  fresh_tyre?: InputMaybe<Scalars['Boolean']['input']>;
  is_accurate?: InputMaybe<Scalars['Boolean']['input']>;
  is_personal_best?: InputMaybe<Scalars['Boolean']['input']>;
  lap_number?: InputMaybe<Scalars['Int']['input']>;
  lap_start_date?: InputMaybe<Scalars['String']['input']>;
  lap_start_time?: InputMaybe<Scalars['bigint']['input']>;
  lap_time?: InputMaybe<Scalars['bigint']['input']>;
  pitin_time?: InputMaybe<Scalars['bigint']['input']>;
  pitout_time?: InputMaybe<Scalars['bigint']['input']>;
  position?: InputMaybe<Scalars['numeric']['input']>;
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
  track_status?: InputMaybe<Scalars['String']['input']>;
  tyre_life?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Laps_Sum_Fields = {
  __typename?: 'laps_sum_fields';
  lap_number?: Maybe<Scalars['Int']['output']>;
  lap_start_time?: Maybe<Scalars['bigint']['output']>;
  lap_time?: Maybe<Scalars['bigint']['output']>;
  pitin_time?: Maybe<Scalars['bigint']['output']>;
  pitout_time?: Maybe<Scalars['bigint']['output']>;
  position?: Maybe<Scalars['numeric']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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

/** aggregate var_pop on columns */
export type Laps_Var_Pop_Fields = {
  __typename?: 'laps_var_pop_fields';
  lap_number?: Maybe<Scalars['Float']['output']>;
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  lap_start_time?: Maybe<Scalars['Float']['output']>;
  lap_time?: Maybe<Scalars['Float']['output']>;
  pitin_time?: Maybe<Scalars['Float']['output']>;
  pitout_time?: Maybe<Scalars['Float']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
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
  lap_start_time?: InputMaybe<Order_By>;
  lap_time?: InputMaybe<Order_By>;
  pitin_time?: InputMaybe<Order_By>;
  pitout_time?: InputMaybe<Order_By>;
  position?: InputMaybe<Order_By>;
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
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table: "event_format_choices" */
  event_format_choices: Array<Event_Format_Choices>;
  /** fetch aggregated fields from the table: "event_format_choices" */
  event_format_choices_aggregate: Event_Format_Choices_Aggregate;
  /** fetch data from the table: "event_format_choices" using primary key columns */
  event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" */
  race_control_messages_categories: Array<Race_Control_Messages_Categories>;
  /** fetch aggregated fields from the table: "race_control_messages_categories" */
  race_control_messages_categories_aggregate: Race_Control_Messages_Categories_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" using primary key columns */
  race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** fetch data from the table: "race_control_messages_flags" */
  race_control_messages_flags: Array<Race_Control_Messages_Flags>;
  /** fetch aggregated fields from the table: "race_control_messages_flags" */
  race_control_messages_flags_aggregate: Race_Control_Messages_Flags_Aggregate;
  /** fetch data from the table: "race_control_messages_flags" using primary key columns */
  race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** fetch data from the table: "race_control_messages_scopes" */
  race_control_messages_scopes: Array<Race_Control_Messages_Scopes>;
  /** fetch aggregated fields from the table: "race_control_messages_scopes" */
  race_control_messages_scopes_aggregate: Race_Control_Messages_Scopes_Aggregate;
  /** fetch data from the table: "race_control_messages_scopes" using primary key columns */
  race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>;
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate;
  /** fetch data from the table: "session_name_choices" */
  session_name_choices: Array<Session_Name_Choices>;
  /** fetch aggregated fields from the table: "session_name_choices" */
  session_name_choices_aggregate: Session_Name_Choices_Aggregate;
  /** fetch data from the table: "session_name_choices" using primary key columns */
  session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry_car_status" */
  telemetry_car_status: Array<Telemetry_Car_Status>;
  /** fetch aggregated fields from the table: "telemetry_car_status" */
  telemetry_car_status_aggregate: Telemetry_Car_Status_Aggregate;
  /** fetch data from the table: "telemetry_car_status" using primary key columns */
  telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** fetch data from the table: "telemetry_sources" */
  telemetry_sources: Array<Telemetry_Sources>;
  /** fetch aggregated fields from the table: "telemetry_sources" */
  telemetry_sources_aggregate: Telemetry_Sources_Aggregate;
  /** fetch data from the table: "telemetry_sources" using primary key columns */
  telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table: "tyre_compounds" */
  tyre_compounds: Array<Tyre_Compounds>;
  /** fetch aggregated fields from the table: "tyre_compounds" */
  tyre_compounds_aggregate: Tyre_Compounds_Aggregate;
  /** fetch data from the table: "tyre_compounds" using primary key columns */
  tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
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

export type Query_RootEvent_Format_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Query_RootEvent_Format_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Query_RootEvent_Format_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
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

export type Query_RootRace_Control_Messages_CategoriesArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootRace_Control_Messages_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Flags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Flags_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootRace_Control_Messages_ScopesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Scopes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Query_RootRace_Control_Messages_Scopes_By_PkArgs = {
  value: Scalars['String']['input'];
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

export type Query_RootScheduleArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Query_RootSchedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Query_RootSession_Name_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Query_RootSession_Name_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Query_RootSession_Name_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
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

export type Query_RootTelemetry_Car_StatusArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Query_RootTelemetry_Car_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Query_RootTelemetry_Car_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Query_RootTelemetry_SourcesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Query_RootTelemetry_Sources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Query_RootTelemetry_Sources_By_PkArgs = {
  value: Scalars['String']['input'];
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

export type Query_RootTyre_CompoundsArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Query_RootTyre_Compounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Query_RootTyre_Compounds_By_PkArgs = {
  value: Scalars['String']['input'];
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

/** columns and relationships of "race_control_messages" */
export type Race_Control_Messages = {
  __typename?: 'race_control_messages';
  category?: Maybe<Race_Control_Messages_Categories_Enum>;
  flag?: Maybe<Race_Control_Messages_Flags_Enum>;
  message?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  race_control_messages_category?: Maybe<Race_Control_Messages_Categories>;
  /** An object relationship */
  race_control_messages_flag?: Maybe<Race_Control_Messages_Flags>;
  /** An object relationship */
  race_control_messages_scope?: Maybe<Race_Control_Messages_Scopes>;
  racing_number?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Race_Control_Messages_Scopes_Enum>;
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
  category?: InputMaybe<Race_Control_Messages_Categories_Enum_Comparison_Exp>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  race_control_messages_category?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
  race_control_messages_flag?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
  race_control_messages_scope?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
  racing_number?: InputMaybe<String_Comparison_Exp>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum_Comparison_Exp>;
  sector?: InputMaybe<Numeric_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  time?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_Categories = {
  __typename?: 'race_control_messages_categories';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_CategoriesRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_categories" */
export type Race_Control_Messages_CategoriesRace_Control_Messages_AggregateArgs =
  {
    distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
    limit?: InputMaybe<Scalars['Int']['input']>;
    offset?: InputMaybe<Scalars['Int']['input']>;
    order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
    where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  };

/** aggregated selection of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate = {
  __typename?: 'race_control_messages_categories_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Categories_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Categories>;
};

/** aggregate fields of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate_Fields = {
  __typename?: 'race_control_messages_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Categories_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Categories_Min_Fields>;
};

/** aggregate fields of "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_categories". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Categories_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Categories_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Race_Control_Messages_Categories_Enum {
  /** Car event category */
  CarEvent = 'CarEvent',
  /** DRS category */
  Drs = 'Drs',
  /** Flag category */
  Flag = 'Flag',
  /** Other category */
  Other = 'Other',
  /** Safety car category */
  SafetyCar = 'SafetyCar',
}

/** Boolean expression to compare columns of type "race_control_messages_categories_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Categories_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Categories_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Categories_Enum>>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Categories_Max_Fields = {
  __typename?: 'race_control_messages_categories_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Categories_Min_Fields = {
  __typename?: 'race_control_messages_categories_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "race_control_messages_categories". */
export type Race_Control_Messages_Categories_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "race_control_messages_categories" */
export enum Race_Control_Messages_Categories_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "race_control_messages_categories" */
export type Race_Control_Messages_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Categories_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_Flags = {
  __typename?: 'race_control_messages_flags';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_FlagsRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_flags" */
export type Race_Control_Messages_FlagsRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** aggregated selection of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate = {
  __typename?: 'race_control_messages_flags_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Flags_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Flags>;
};

/** aggregate fields of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate_Fields = {
  __typename?: 'race_control_messages_flags_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Flags_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Flags_Min_Fields>;
};

/** aggregate fields of "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_flags". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Flags_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Flags_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Flags_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Race_Control_Messages_Flags_Enum {
  /** Black flag */
  Black = 'BLACK',
  /** Black and white flag */
  BlackAndWhite = 'BLACK_AND_WHITE',
  /** Blue flag */
  Blue = 'BLUE',
  /** Chequered flag */
  Chequered = 'CHEQUERED',
  /** Clear flag */
  Clear = 'CLEAR',
  /** Double yellow flag */
  DoubleYellow = 'DOUBLE_YELLOW',
  /** Green flag */
  Green = 'GREEN',
  /** Red flag */
  Red = 'RED',
  /** Yellow flag */
  Yellow = 'YELLOW',
}

/** Boolean expression to compare columns of type "race_control_messages_flags_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Flags_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Flags_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Flags_Enum>>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Flags_Max_Fields = {
  __typename?: 'race_control_messages_flags_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Flags_Min_Fields = {
  __typename?: 'race_control_messages_flags_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "race_control_messages_flags". */
export type Race_Control_Messages_Flags_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "race_control_messages_flags" */
export enum Race_Control_Messages_Flags_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "race_control_messages_flags" */
export type Race_Control_Messages_Flags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Flags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Flags_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Max_Fields = {
  __typename?: 'race_control_messages_max_fields';
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "race_control_messages" */
export type Race_Control_Messages_Max_Order_By = {
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Min_Fields = {
  __typename?: 'race_control_messages_min_fields';
  message?: Maybe<Scalars['String']['output']>;
  racing_number?: Maybe<Scalars['String']['output']>;
  sector?: Maybe<Scalars['numeric']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "race_control_messages" */
export type Race_Control_Messages_Min_Order_By = {
  message?: InputMaybe<Order_By>;
  racing_number?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "race_control_messages". */
export type Race_Control_Messages_Order_By = {
  category?: InputMaybe<Order_By>;
  flag?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  race_control_messages_category?: InputMaybe<Race_Control_Messages_Categories_Order_By>;
  race_control_messages_flag?: InputMaybe<Race_Control_Messages_Flags_Order_By>;
  race_control_messages_scope?: InputMaybe<Race_Control_Messages_Scopes_Order_By>;
  racing_number?: InputMaybe<Order_By>;
  scope?: InputMaybe<Order_By>;
  sector?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes = {
  __typename?: 'race_control_messages_scopes';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_ScopesRace_Control_MessagesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** columns and relationships of "race_control_messages_scopes" */
export type Race_Control_Messages_ScopesRace_Control_Messages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Bool_Exp>;
};

/** aggregated selection of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate = {
  __typename?: 'race_control_messages_scopes_aggregate';
  aggregate?: Maybe<Race_Control_Messages_Scopes_Aggregate_Fields>;
  nodes: Array<Race_Control_Messages_Scopes>;
};

/** aggregate fields of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate_Fields = {
  __typename?: 'race_control_messages_scopes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Race_Control_Messages_Scopes_Max_Fields>;
  min?: Maybe<Race_Control_Messages_Scopes_Min_Fields>;
};

/** aggregate fields of "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "race_control_messages_scopes". All fields are combined with a logical 'AND'. */
export type Race_Control_Messages_Scopes_Bool_Exp = {
  _and?: InputMaybe<Array<Race_Control_Messages_Scopes_Bool_Exp>>;
  _not?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
  _or?: InputMaybe<Array<Race_Control_Messages_Scopes_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Race_Control_Messages_Scopes_Enum {
  /** Driver scope */
  Driver = 'Driver',
  /** Sector scope */
  Sector = 'Sector',
  /** Track scope */
  Track = 'Track',
}

/** Boolean expression to compare columns of type "race_control_messages_scopes_enum". All fields are combined with logical 'AND'. */
export type Race_Control_Messages_Scopes_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  _in?: InputMaybe<Array<Race_Control_Messages_Scopes_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
  _nin?: InputMaybe<Array<Race_Control_Messages_Scopes_Enum>>;
};

/** aggregate max on columns */
export type Race_Control_Messages_Scopes_Max_Fields = {
  __typename?: 'race_control_messages_scopes_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Race_Control_Messages_Scopes_Min_Fields = {
  __typename?: 'race_control_messages_scopes_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "race_control_messages_scopes". */
export type Race_Control_Messages_Scopes_Order_By = {
  comment?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "race_control_messages_scopes" */
export enum Race_Control_Messages_Scopes_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "race_control_messages_scopes" */
export type Race_Control_Messages_Scopes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Race_Control_Messages_Scopes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Race_Control_Messages_Scopes_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** select columns of table "race_control_messages" */
export enum Race_Control_Messages_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Flag = 'flag',
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
  category?: InputMaybe<Race_Control_Messages_Categories_Enum>;
  flag?: InputMaybe<Race_Control_Messages_Flags_Enum>;
  message?: InputMaybe<Scalars['String']['input']>;
  racing_number?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Race_Control_Messages_Scopes_Enum>;
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
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  driver_session?: Maybe<Driver_Sessions>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
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
  points?: InputMaybe<Numeric_Comparison_Exp>;
  q1_time?: InputMaybe<Bigint_Comparison_Exp>;
  q2_time?: InputMaybe<Bigint_Comparison_Exp>;
  q3_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  total_race_time?: InputMaybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Results_Max_Fields = {
  __typename?: 'results_max_fields';
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "results" */
export type Results_Max_Order_By = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
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
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: Maybe<Scalars['String']['output']>;
  driver_session_id?: Maybe<Scalars['String']['output']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: Maybe<Scalars['Int']['output']>;
  grid_position?: Maybe<Scalars['Int']['output']>;
  points?: Maybe<Scalars['numeric']['output']>;
  q1_time?: Maybe<Scalars['bigint']['output']>;
  q2_time?: Maybe<Scalars['bigint']['output']>;
  q3_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  total_race_time?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "results" */
export type Results_Min_Order_By = {
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "results". */
export type Results_Order_By = {
  classified_position?: InputMaybe<Order_By>;
  driver_session?: InputMaybe<Driver_Sessions_Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
  finishing_position?: InputMaybe<Order_By>;
  grid_position?: InputMaybe<Order_By>;
  points?: InputMaybe<Order_By>;
  q1_time?: InputMaybe<Order_By>;
  q2_time?: InputMaybe<Order_By>;
  q3_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  total_race_time?: InputMaybe<Order_By>;
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
  /** This is either an INTEGER value if the driver is officially classified or one of “R” (retired), “D” (disqualified), “E” (excluded), “W” (withdrawn), “F” (failed to qualify) or “N” (not classified) */
  classified_position?: InputMaybe<Scalars['String']['input']>;
  driver_session_id?: InputMaybe<Scalars['String']['input']>;
  /** The drivers finishing position (values only given if session is ‘Race’, ‘Qualifying’, ‘Sprint Shootout’, ‘Sprint’, or ‘Sprint Qualifying’ */
  finishing_position?: InputMaybe<Scalars['Int']['input']>;
  grid_position?: InputMaybe<Scalars['Int']['input']>;
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

/** columns and relationships of "schedule" */
export type Schedule = {
  __typename?: 'schedule';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_format?: Maybe<Event_Format_Choices_Enum>;
  /** An object relationship */
  event_format_choice?: Maybe<Event_Format_Choices>;
  event_name?: Maybe<Scalars['String']['output']>;
  f1_api_support?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1?: Maybe<Session_Name_Choices_Enum>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2?: Maybe<Session_Name_Choices_Enum>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3?: Maybe<Session_Name_Choices_Enum>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4?: Maybe<Session_Name_Choices_Enum>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5?: Maybe<Session_Name_Choices_Enum>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  sessionNameChoiceBySession2?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession3?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession4?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  sessionNameChoiceBySession5?: Maybe<Session_Name_Choices>;
  /** An object relationship */
  session_name_choice?: Maybe<Session_Name_Choices>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "schedule" */
export type Schedule_Aggregate = {
  __typename?: 'schedule_aggregate';
  aggregate?: Maybe<Schedule_Aggregate_Fields>;
  nodes: Array<Schedule>;
};

export type Schedule_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Schedule_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Schedule_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Schedule_Aggregate_Bool_Exp_Count>;
};

export type Schedule_Aggregate_Bool_Exp_Bool_And = {
  arguments: Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Schedule_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Schedule_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Schedule_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Schedule_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_Fields = {
  __typename?: 'schedule_aggregate_fields';
  avg?: Maybe<Schedule_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Schedule_Max_Fields>;
  min?: Maybe<Schedule_Min_Fields>;
  stddev?: Maybe<Schedule_Stddev_Fields>;
  stddev_pop?: Maybe<Schedule_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Schedule_Stddev_Samp_Fields>;
  sum?: Maybe<Schedule_Sum_Fields>;
  var_pop?: Maybe<Schedule_Var_Pop_Fields>;
  var_samp?: Maybe<Schedule_Var_Samp_Fields>;
  variance?: Maybe<Schedule_Variance_Fields>;
};

/** aggregate fields of "schedule" */
export type Schedule_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Schedule_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "schedule" */
export type Schedule_Aggregate_Order_By = {
  avg?: InputMaybe<Schedule_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Schedule_Max_Order_By>;
  min?: InputMaybe<Schedule_Min_Order_By>;
  stddev?: InputMaybe<Schedule_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Schedule_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Schedule_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Schedule_Sum_Order_By>;
  var_pop?: InputMaybe<Schedule_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Schedule_Var_Samp_Order_By>;
  variance?: InputMaybe<Schedule_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Schedule_Avg_Fields = {
  __typename?: 'schedule_avg_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "schedule" */
export type Schedule_Avg_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "schedule". All fields are combined with a logical 'AND'. */
export type Schedule_Bool_Exp = {
  _and?: InputMaybe<Array<Schedule_Bool_Exp>>;
  _not?: InputMaybe<Schedule_Bool_Exp>;
  _or?: InputMaybe<Array<Schedule_Bool_Exp>>;
  country?: InputMaybe<String_Comparison_Exp>;
  event_date?: InputMaybe<String_Comparison_Exp>;
  event_format?: InputMaybe<Event_Format_Choices_Enum_Comparison_Exp>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Bool_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  f1_api_support?: InputMaybe<Boolean_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  official_event_name?: InputMaybe<String_Comparison_Exp>;
  round_number?: InputMaybe<Int_Comparison_Exp>;
  session1?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session1_date?: InputMaybe<String_Comparison_Exp>;
  session1_date_utc?: InputMaybe<String_Comparison_Exp>;
  session2?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session2_date?: InputMaybe<String_Comparison_Exp>;
  session2_date_utc?: InputMaybe<String_Comparison_Exp>;
  session3?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session3_date?: InputMaybe<String_Comparison_Exp>;
  session3_date_utc?: InputMaybe<String_Comparison_Exp>;
  session4?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session4_date?: InputMaybe<String_Comparison_Exp>;
  session4_date_utc?: InputMaybe<String_Comparison_Exp>;
  session5?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  session5_date?: InputMaybe<String_Comparison_Exp>;
  session5_date_utc?: InputMaybe<String_Comparison_Exp>;
  sessionNameChoiceBySession2?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession3?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession4?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  sessionNameChoiceBySession5?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  year?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Schedule_Max_Fields = {
  __typename?: 'schedule_max_fields';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "schedule" */
export type Schedule_Max_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Schedule_Min_Fields = {
  __typename?: 'schedule_min_fields';
  country?: Maybe<Scalars['String']['output']>;
  event_date?: Maybe<Scalars['String']['output']>;
  event_name?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  official_event_name?: Maybe<Scalars['String']['output']>;
  round_number?: Maybe<Scalars['Int']['output']>;
  session1_date?: Maybe<Scalars['String']['output']>;
  session1_date_utc?: Maybe<Scalars['String']['output']>;
  session2_date?: Maybe<Scalars['String']['output']>;
  session2_date_utc?: Maybe<Scalars['String']['output']>;
  session3_date?: Maybe<Scalars['String']['output']>;
  session3_date_utc?: Maybe<Scalars['String']['output']>;
  session4_date?: Maybe<Scalars['String']['output']>;
  session4_date_utc?: Maybe<Scalars['String']['output']>;
  session5_date?: Maybe<Scalars['String']['output']>;
  session5_date_utc?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "schedule" */
export type Schedule_Min_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "schedule". */
export type Schedule_Order_By = {
  country?: InputMaybe<Order_By>;
  event_date?: InputMaybe<Order_By>;
  event_format?: InputMaybe<Order_By>;
  event_format_choice?: InputMaybe<Event_Format_Choices_Order_By>;
  event_name?: InputMaybe<Order_By>;
  f1_api_support?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  official_event_name?: InputMaybe<Order_By>;
  round_number?: InputMaybe<Order_By>;
  session1?: InputMaybe<Order_By>;
  session1_date?: InputMaybe<Order_By>;
  session1_date_utc?: InputMaybe<Order_By>;
  session2?: InputMaybe<Order_By>;
  session2_date?: InputMaybe<Order_By>;
  session2_date_utc?: InputMaybe<Order_By>;
  session3?: InputMaybe<Order_By>;
  session3_date?: InputMaybe<Order_By>;
  session3_date_utc?: InputMaybe<Order_By>;
  session4?: InputMaybe<Order_By>;
  session4_date?: InputMaybe<Order_By>;
  session4_date_utc?: InputMaybe<Order_By>;
  session5?: InputMaybe<Order_By>;
  session5_date?: InputMaybe<Order_By>;
  session5_date_utc?: InputMaybe<Order_By>;
  sessionNameChoiceBySession2?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession3?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession4?: InputMaybe<Session_Name_Choices_Order_By>;
  sessionNameChoiceBySession5?: InputMaybe<Session_Name_Choices_Order_By>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Order_By>;
  year?: InputMaybe<Order_By>;
};

/** select columns of table "schedule" */
export enum Schedule_Select_Column {
  /** column name */
  Country = 'country',
  /** column name */
  EventDate = 'event_date',
  /** column name */
  EventFormat = 'event_format',
  /** column name */
  EventName = 'event_name',
  /** column name */
  F1ApiSupport = 'f1_api_support',
  /** column name */
  Location = 'location',
  /** column name */
  OfficialEventName = 'official_event_name',
  /** column name */
  RoundNumber = 'round_number',
  /** column name */
  Session1 = 'session1',
  /** column name */
  Session1Date = 'session1_date',
  /** column name */
  Session1DateUtc = 'session1_date_utc',
  /** column name */
  Session2 = 'session2',
  /** column name */
  Session2Date = 'session2_date',
  /** column name */
  Session2DateUtc = 'session2_date_utc',
  /** column name */
  Session3 = 'session3',
  /** column name */
  Session3Date = 'session3_date',
  /** column name */
  Session3DateUtc = 'session3_date_utc',
  /** column name */
  Session4 = 'session4',
  /** column name */
  Session4Date = 'session4_date',
  /** column name */
  Session4DateUtc = 'session4_date_utc',
  /** column name */
  Session5 = 'session5',
  /** column name */
  Session5Date = 'session5_date',
  /** column name */
  Session5DateUtc = 'session5_date_utc',
  /** column name */
  Year = 'year',
}

/** select "schedule_aggregate_bool_exp_bool_and_arguments_columns" columns of table "schedule" */
export enum Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** select "schedule_aggregate_bool_exp_bool_or_arguments_columns" columns of table "schedule" */
export enum Schedule_Select_Column_Schedule_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  F1ApiSupport = 'f1_api_support',
}

/** aggregate stddev on columns */
export type Schedule_Stddev_Fields = {
  __typename?: 'schedule_stddev_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "schedule" */
export type Schedule_Stddev_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Schedule_Stddev_Pop_Fields = {
  __typename?: 'schedule_stddev_pop_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "schedule" */
export type Schedule_Stddev_Pop_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Schedule_Stddev_Samp_Fields = {
  __typename?: 'schedule_stddev_samp_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "schedule" */
export type Schedule_Stddev_Samp_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "schedule" */
export type Schedule_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Schedule_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Schedule_Stream_Cursor_Value_Input = {
  country?: InputMaybe<Scalars['String']['input']>;
  event_date?: InputMaybe<Scalars['String']['input']>;
  event_format?: InputMaybe<Event_Format_Choices_Enum>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  f1_api_support?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  official_event_name?: InputMaybe<Scalars['String']['input']>;
  round_number?: InputMaybe<Scalars['Int']['input']>;
  session1?: InputMaybe<Session_Name_Choices_Enum>;
  session1_date?: InputMaybe<Scalars['String']['input']>;
  session1_date_utc?: InputMaybe<Scalars['String']['input']>;
  session2?: InputMaybe<Session_Name_Choices_Enum>;
  session2_date?: InputMaybe<Scalars['String']['input']>;
  session2_date_utc?: InputMaybe<Scalars['String']['input']>;
  session3?: InputMaybe<Session_Name_Choices_Enum>;
  session3_date?: InputMaybe<Scalars['String']['input']>;
  session3_date_utc?: InputMaybe<Scalars['String']['input']>;
  session4?: InputMaybe<Session_Name_Choices_Enum>;
  session4_date?: InputMaybe<Scalars['String']['input']>;
  session4_date_utc?: InputMaybe<Scalars['String']['input']>;
  session5?: InputMaybe<Session_Name_Choices_Enum>;
  session5_date?: InputMaybe<Scalars['String']['input']>;
  session5_date_utc?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Schedule_Sum_Fields = {
  __typename?: 'schedule_sum_fields';
  round_number?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "schedule" */
export type Schedule_Sum_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Schedule_Var_Pop_Fields = {
  __typename?: 'schedule_var_pop_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "schedule" */
export type Schedule_Var_Pop_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Schedule_Var_Samp_Fields = {
  __typename?: 'schedule_var_samp_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "schedule" */
export type Schedule_Var_Samp_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Schedule_Variance_Fields = {
  __typename?: 'schedule_variance_fields';
  round_number?: Maybe<Scalars['Float']['output']>;
  year?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "schedule" */
export type Schedule_Variance_Order_By = {
  round_number?: InputMaybe<Order_By>;
  year?: InputMaybe<Order_By>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_Choices = {
  __typename?: 'session_name_choices';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  schedules: Array<Schedule>;
  /** An array relationship */
  schedulesBySession2: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession2_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession3: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession3_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession4: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession4_aggregate: Schedule_Aggregate;
  /** An array relationship */
  schedulesBySession5: Array<Schedule>;
  /** An aggregate relationship */
  schedulesBySession5_aggregate: Schedule_Aggregate;
  /** An aggregate relationship */
  schedules_aggregate: Schedule_Aggregate;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession2Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession3Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession3_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession4Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession4_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession5Args = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedulesBySession5_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSchedules_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSessionsArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** columns and relationships of "session_name_choices" */
export type Session_Name_ChoicesSessions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sessions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sessions_Order_By>>;
  where?: InputMaybe<Sessions_Bool_Exp>;
};

/** aggregated selection of "session_name_choices" */
export type Session_Name_Choices_Aggregate = {
  __typename?: 'session_name_choices_aggregate';
  aggregate?: Maybe<Session_Name_Choices_Aggregate_Fields>;
  nodes: Array<Session_Name_Choices>;
};

/** aggregate fields of "session_name_choices" */
export type Session_Name_Choices_Aggregate_Fields = {
  __typename?: 'session_name_choices_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Session_Name_Choices_Max_Fields>;
  min?: Maybe<Session_Name_Choices_Min_Fields>;
};

/** aggregate fields of "session_name_choices" */
export type Session_Name_Choices_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "session_name_choices". All fields are combined with a logical 'AND'. */
export type Session_Name_Choices_Bool_Exp = {
  _and?: InputMaybe<Array<Session_Name_Choices_Bool_Exp>>;
  _not?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  _or?: InputMaybe<Array<Session_Name_Choices_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  schedules?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession2?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession2_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession3?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession3_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession4?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession4_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedulesBySession5?: InputMaybe<Schedule_Bool_Exp>;
  schedulesBySession5_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Bool_Exp>;
  sessions?: InputMaybe<Sessions_Bool_Exp>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Session_Name_Choices_Enum {
  /** Practice 1 session */
  Practice_1 = 'Practice_1',
  /** Practice 2 session */
  Practice_2 = 'Practice_2',
  /** Practice 3 session */
  Practice_3 = 'Practice_3',
  /** Qualifying session */
  Qualifying = 'Qualifying',
  /** Race session */
  Race = 'Race',
  /** Sprint session */
  Sprint = 'Sprint',
  /** Sprint Qualifying session */
  SprintQualifying = 'Sprint_Qualifying',
  /** Sprint Shootout session */
  SprintShootout = 'Sprint_Shootout',
  /** Test session */
  TestSession = 'Test_Session',
}

/** Boolean expression to compare columns of type "session_name_choices_enum". All fields are combined with logical 'AND'. */
export type Session_Name_Choices_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Session_Name_Choices_Enum>;
  _in?: InputMaybe<Array<Session_Name_Choices_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Session_Name_Choices_Enum>;
  _nin?: InputMaybe<Array<Session_Name_Choices_Enum>>;
};

/** aggregate max on columns */
export type Session_Name_Choices_Max_Fields = {
  __typename?: 'session_name_choices_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Session_Name_Choices_Min_Fields = {
  __typename?: 'session_name_choices_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "session_name_choices". */
export type Session_Name_Choices_Order_By = {
  comment?: InputMaybe<Order_By>;
  schedulesBySession2_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession3_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession4_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedulesBySession5_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  schedules_aggregate?: InputMaybe<Schedule_Aggregate_Order_By>;
  sessions_aggregate?: InputMaybe<Sessions_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "session_name_choices" */
export enum Session_Name_Choices_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "session_name_choices" */
export type Session_Name_Choices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Session_Name_Choices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Session_Name_Choices_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  name?: Maybe<Session_Name_Choices_Enum>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  session_name_choice?: Maybe<Session_Name_Choices>;
  start_time?: Maybe<Scalars['numeric']['output']>;
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

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
  __typename?: 'sessions_avg_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sessions" */
export type Sessions_Avg_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
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
  name?: InputMaybe<Session_Name_Choices_Enum_Comparison_Exp>;
  race_control_messages?: InputMaybe<Race_Control_Messages_Bool_Exp>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Bool_Exp>;
  scheduled_laps?: InputMaybe<Int_Comparison_Exp>;
  scheduled_start_time?: InputMaybe<String_Comparison_Exp>;
  scheduled_start_time_utc?: InputMaybe<String_Comparison_Exp>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Bool_Exp>;
  start_time?: InputMaybe<Numeric_Comparison_Exp>;
  total_laps?: InputMaybe<Int_Comparison_Exp>;
  track_statuses?: InputMaybe<Track_Status_Bool_Exp>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Bool_Exp>;
  weather_data?: InputMaybe<Weather_Data_Bool_Exp>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Bool_Exp>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
  __typename?: 'sessions_max_fields';
  circuit_id?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "sessions" */
export type Sessions_Max_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
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
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  scheduled_start_time?: Maybe<Scalars['String']['output']>;
  scheduled_start_time_utc?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "sessions" */
export type Sessions_Min_Order_By = {
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  scheduled_laps?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
  circuit?: InputMaybe<Circuits_Order_By>;
  circuit_id?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  driver_sessions_aggregate?: InputMaybe<Driver_Sessions_Aggregate_Order_By>;
  event?: InputMaybe<Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  race_control_messages_aggregate?: InputMaybe<Race_Control_Messages_Aggregate_Order_By>;
  scheduled_laps?: InputMaybe<Order_By>;
  scheduled_start_time?: InputMaybe<Order_By>;
  scheduled_start_time_utc?: InputMaybe<Order_By>;
  session_name_choice?: InputMaybe<Session_Name_Choices_Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
  track_statuses_aggregate?: InputMaybe<Track_Status_Aggregate_Order_By>;
  weather_data_aggregate?: InputMaybe<Weather_Data_Aggregate_Order_By>;
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

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
  __typename?: 'sessions_stddev_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sessions" */
export type Sessions_Stddev_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
  __typename?: 'sessions_stddev_pop_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sessions" */
export type Sessions_Stddev_Pop_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
  __typename?: 'sessions_stddev_samp_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sessions" */
export type Sessions_Stddev_Samp_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
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
  name?: InputMaybe<Session_Name_Choices_Enum>;
  scheduled_laps?: InputMaybe<Scalars['Int']['input']>;
  scheduled_start_time?: InputMaybe<Scalars['String']['input']>;
  scheduled_start_time_utc?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['numeric']['input']>;
  total_laps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
  __typename?: 'sessions_sum_fields';
  scheduled_laps?: Maybe<Scalars['Int']['output']>;
  start_time?: Maybe<Scalars['numeric']['output']>;
  total_laps?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sessions" */
export type Sessions_Sum_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
  __typename?: 'sessions_var_pop_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sessions" */
export type Sessions_Var_Pop_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
  __typename?: 'sessions_var_samp_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sessions" */
export type Sessions_Var_Samp_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
  __typename?: 'sessions_variance_fields';
  scheduled_laps?: Maybe<Scalars['Float']['output']>;
  start_time?: Maybe<Scalars['Float']['output']>;
  total_laps?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sessions" */
export type Sessions_Variance_Order_By = {
  scheduled_laps?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_laps?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "circuits" */
  circuits: Array<Circuits>;
  /** fetch aggregated fields from the table: "circuits" */
  circuits_aggregate: Circuits_Aggregate;
  /** fetch data from the table in a streaming manner: "circuits" */
  circuits_stream: Array<Circuits>;
  /** An array relationship */
  constructor_standings: Array<Constructor_Standings>;
  /** An aggregate relationship */
  constructor_standings_aggregate: Constructor_Standings_Aggregate;
  /** fetch data from the table in a streaming manner: "constructor_standings" */
  constructor_standings_stream: Array<Constructor_Standings>;
  /** fetch data from the table: "constructors" */
  constructors: Array<Constructors>;
  /** fetch aggregated fields from the table: "constructors" */
  constructors_aggregate: Constructors_Aggregate;
  /** fetch data from the table in a streaming manner: "constructors" */
  constructors_stream: Array<Constructors>;
  /** An array relationship */
  driver_sessions: Array<Driver_Sessions>;
  /** An aggregate relationship */
  driver_sessions_aggregate: Driver_Sessions_Aggregate;
  /** fetch data from the table in a streaming manner: "driver_sessions" */
  driver_sessions_stream: Array<Driver_Sessions>;
  /** An array relationship */
  driver_standings: Array<Driver_Standings>;
  /** An aggregate relationship */
  driver_standings_aggregate: Driver_Standings_Aggregate;
  /** fetch data from the table in a streaming manner: "driver_standings" */
  driver_standings_stream: Array<Driver_Standings>;
  /** fetch data from the table: "drivers" */
  drivers: Array<Drivers>;
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: Drivers_Aggregate;
  /** fetch data from the table in a streaming manner: "drivers" */
  drivers_stream: Array<Drivers>;
  /** fetch data from the table: "event_format_choices" */
  event_format_choices: Array<Event_Format_Choices>;
  /** fetch aggregated fields from the table: "event_format_choices" */
  event_format_choices_aggregate: Event_Format_Choices_Aggregate;
  /** fetch data from the table: "event_format_choices" using primary key columns */
  event_format_choices_by_pk?: Maybe<Event_Format_Choices>;
  /** fetch data from the table in a streaming manner: "event_format_choices" */
  event_format_choices_stream: Array<Event_Format_Choices>;
  /** An array relationship */
  events: Array<Events>;
  /** An aggregate relationship */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  /** fetch data from the table in a streaming manner: "laps" */
  laps_stream: Array<Laps>;
  /** An array relationship */
  race_control_messages: Array<Race_Control_Messages>;
  /** An aggregate relationship */
  race_control_messages_aggregate: Race_Control_Messages_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" */
  race_control_messages_categories: Array<Race_Control_Messages_Categories>;
  /** fetch aggregated fields from the table: "race_control_messages_categories" */
  race_control_messages_categories_aggregate: Race_Control_Messages_Categories_Aggregate;
  /** fetch data from the table: "race_control_messages_categories" using primary key columns */
  race_control_messages_categories_by_pk?: Maybe<Race_Control_Messages_Categories>;
  /** fetch data from the table in a streaming manner: "race_control_messages_categories" */
  race_control_messages_categories_stream: Array<Race_Control_Messages_Categories>;
  /** fetch data from the table: "race_control_messages_flags" */
  race_control_messages_flags: Array<Race_Control_Messages_Flags>;
  /** fetch aggregated fields from the table: "race_control_messages_flags" */
  race_control_messages_flags_aggregate: Race_Control_Messages_Flags_Aggregate;
  /** fetch data from the table: "race_control_messages_flags" using primary key columns */
  race_control_messages_flags_by_pk?: Maybe<Race_Control_Messages_Flags>;
  /** fetch data from the table in a streaming manner: "race_control_messages_flags" */
  race_control_messages_flags_stream: Array<Race_Control_Messages_Flags>;
  /** fetch data from the table: "race_control_messages_scopes" */
  race_control_messages_scopes: Array<Race_Control_Messages_Scopes>;
  /** fetch aggregated fields from the table: "race_control_messages_scopes" */
  race_control_messages_scopes_aggregate: Race_Control_Messages_Scopes_Aggregate;
  /** fetch data from the table: "race_control_messages_scopes" using primary key columns */
  race_control_messages_scopes_by_pk?: Maybe<Race_Control_Messages_Scopes>;
  /** fetch data from the table in a streaming manner: "race_control_messages_scopes" */
  race_control_messages_scopes_stream: Array<Race_Control_Messages_Scopes>;
  /** fetch data from the table in a streaming manner: "race_control_messages" */
  race_control_messages_stream: Array<Race_Control_Messages>;
  /** An array relationship */
  results: Array<Results>;
  /** An aggregate relationship */
  results_aggregate: Results_Aggregate;
  /** fetch data from the table in a streaming manner: "results" */
  results_stream: Array<Results>;
  /** fetch data from the table: "schedule" */
  schedule: Array<Schedule>;
  /** fetch aggregated fields from the table: "schedule" */
  schedule_aggregate: Schedule_Aggregate;
  /** fetch data from the table in a streaming manner: "schedule" */
  schedule_stream: Array<Schedule>;
  /** fetch data from the table: "session_name_choices" */
  session_name_choices: Array<Session_Name_Choices>;
  /** fetch aggregated fields from the table: "session_name_choices" */
  session_name_choices_aggregate: Session_Name_Choices_Aggregate;
  /** fetch data from the table: "session_name_choices" using primary key columns */
  session_name_choices_by_pk?: Maybe<Session_Name_Choices>;
  /** fetch data from the table in a streaming manner: "session_name_choices" */
  session_name_choices_stream: Array<Session_Name_Choices>;
  /** An array relationship */
  sessions: Array<Sessions>;
  /** An aggregate relationship */
  sessions_aggregate: Sessions_Aggregate;
  /** fetch data from the table in a streaming manner: "sessions" */
  sessions_stream: Array<Sessions>;
  /** fetch data from the table: "telemetry" */
  telemetry: Array<Telemetry>;
  /** fetch aggregated fields from the table: "telemetry" */
  telemetry_aggregate: Telemetry_Aggregate;
  /** fetch data from the table: "telemetry_car_status" */
  telemetry_car_status: Array<Telemetry_Car_Status>;
  /** fetch aggregated fields from the table: "telemetry_car_status" */
  telemetry_car_status_aggregate: Telemetry_Car_Status_Aggregate;
  /** fetch data from the table: "telemetry_car_status" using primary key columns */
  telemetry_car_status_by_pk?: Maybe<Telemetry_Car_Status>;
  /** fetch data from the table in a streaming manner: "telemetry_car_status" */
  telemetry_car_status_stream: Array<Telemetry_Car_Status>;
  /** fetch data from the table: "telemetry_sources" */
  telemetry_sources: Array<Telemetry_Sources>;
  /** fetch aggregated fields from the table: "telemetry_sources" */
  telemetry_sources_aggregate: Telemetry_Sources_Aggregate;
  /** fetch data from the table: "telemetry_sources" using primary key columns */
  telemetry_sources_by_pk?: Maybe<Telemetry_Sources>;
  /** fetch data from the table in a streaming manner: "telemetry_sources" */
  telemetry_sources_stream: Array<Telemetry_Sources>;
  /** fetch data from the table in a streaming manner: "telemetry" */
  telemetry_stream: Array<Telemetry>;
  /** fetch data from the table: "track_status" */
  track_status: Array<Track_Status>;
  /** fetch aggregated fields from the table: "track_status" */
  track_status_aggregate: Track_Status_Aggregate;
  /** fetch data from the table in a streaming manner: "track_status" */
  track_status_stream: Array<Track_Status>;
  /** fetch data from the table: "tyre_compounds" */
  tyre_compounds: Array<Tyre_Compounds>;
  /** fetch aggregated fields from the table: "tyre_compounds" */
  tyre_compounds_aggregate: Tyre_Compounds_Aggregate;
  /** fetch data from the table: "tyre_compounds" using primary key columns */
  tyre_compounds_by_pk?: Maybe<Tyre_Compounds>;
  /** fetch data from the table in a streaming manner: "tyre_compounds" */
  tyre_compounds_stream: Array<Tyre_Compounds>;
  /** An array relationship */
  weather_data: Array<Weather_Data>;
  /** An aggregate relationship */
  weather_data_aggregate: Weather_Data_Aggregate;
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

export type Subscription_RootDrivers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Drivers_Stream_Cursor_Input>>;
  where?: InputMaybe<Drivers_Bool_Exp>;
};

export type Subscription_RootEvent_Format_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Subscription_RootEvent_Format_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Format_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Format_Choices_Order_By>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
};

export type Subscription_RootEvent_Format_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootEvent_Format_Choices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Format_Choices_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Format_Choices_Bool_Exp>;
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

export type Subscription_RootRace_Control_Messages_CategoriesArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<
    Array<Race_Control_Messages_Categories_Select_Column>
  >;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Categories_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Categories_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<
    InputMaybe<Race_Control_Messages_Categories_Stream_Cursor_Input>
  >;
  where?: InputMaybe<Race_Control_Messages_Categories_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_FlagsArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Flags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Flags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Flags_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Flags_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Flags_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Flags_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Flags_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_ScopesArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Scopes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Race_Control_Messages_Scopes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Race_Control_Messages_Scopes_Order_By>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
};

export type Subscription_RootRace_Control_Messages_Scopes_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootRace_Control_Messages_Scopes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Race_Control_Messages_Scopes_Stream_Cursor_Input>>;
  where?: InputMaybe<Race_Control_Messages_Scopes_Bool_Exp>;
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

export type Subscription_RootResults_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Results_Stream_Cursor_Input>>;
  where?: InputMaybe<Results_Bool_Exp>;
};

export type Subscription_RootScheduleArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSchedule_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Schedule_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Schedule_Order_By>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSchedule_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Schedule_Stream_Cursor_Input>>;
  where?: InputMaybe<Schedule_Bool_Exp>;
};

export type Subscription_RootSession_Name_ChoicesArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Subscription_RootSession_Name_Choices_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Session_Name_Choices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Session_Name_Choices_Order_By>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
};

export type Subscription_RootSession_Name_Choices_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootSession_Name_Choices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Session_Name_Choices_Stream_Cursor_Input>>;
  where?: InputMaybe<Session_Name_Choices_Bool_Exp>;
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

export type Subscription_RootTelemetry_Car_StatusArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_Car_Status_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Car_Status_Order_By>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_Car_Status_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_Car_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Car_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
};

export type Subscription_RootTelemetry_SourcesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Subscription_RootTelemetry_Sources_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Sources_Order_By>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
};

export type Subscription_RootTelemetry_Sources_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTelemetry_Sources_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Telemetry_Sources_Stream_Cursor_Input>>;
  where?: InputMaybe<Telemetry_Sources_Bool_Exp>;
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

export type Subscription_RootTrack_Status_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Track_Status_Stream_Cursor_Input>>;
  where?: InputMaybe<Track_Status_Bool_Exp>;
};

export type Subscription_RootTyre_CompoundsArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Subscription_RootTyre_Compounds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tyre_Compounds_Order_By>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
};

export type Subscription_RootTyre_Compounds_By_PkArgs = {
  value: Scalars['String']['input'];
};

export type Subscription_RootTyre_Compounds_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tyre_Compounds_Stream_Cursor_Input>>;
  where?: InputMaybe<Tyre_Compounds_Bool_Exp>;
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
  relative_distance?: Maybe<Scalars['numeric']['output']>;
  rpm?: Maybe<Scalars['Int']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  source?: Maybe<Telemetry_Sources_Enum>;
  speed?: Maybe<Scalars['numeric']['output']>;
  status?: Maybe<Telemetry_Car_Status_Enum>;
  /** An object relationship */
  telemetry_car_status?: Maybe<Telemetry_Car_Status>;
  /** An object relationship */
  telemetry_source?: Maybe<Telemetry_Sources>;
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
  relative_distance?: InputMaybe<Numeric_Comparison_Exp>;
  rpm?: InputMaybe<Int_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  source?: InputMaybe<Telemetry_Sources_Enum_Comparison_Exp>;
  speed?: InputMaybe<Numeric_Comparison_Exp>;
  status?: InputMaybe<Telemetry_Car_Status_Enum_Comparison_Exp>;
  telemetry_car_status?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
  telemetry_source?: InputMaybe<Telemetry_Sources_Bool_Exp>;
  throttle?: InputMaybe<Numeric_Comparison_Exp>;
  time?: InputMaybe<Bigint_Comparison_Exp>;
  x?: InputMaybe<Numeric_Comparison_Exp>;
  y?: InputMaybe<Numeric_Comparison_Exp>;
  z?: InputMaybe<Numeric_Comparison_Exp>;
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_Status = {
  __typename?: 'telemetry_car_status';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_StatusTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "telemetry_car_status" */
export type Telemetry_Car_StatusTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate = {
  __typename?: 'telemetry_car_status_aggregate';
  aggregate?: Maybe<Telemetry_Car_Status_Aggregate_Fields>;
  nodes: Array<Telemetry_Car_Status>;
};

/** aggregate fields of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate_Fields = {
  __typename?: 'telemetry_car_status_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Car_Status_Max_Fields>;
  min?: Maybe<Telemetry_Car_Status_Min_Fields>;
};

/** aggregate fields of "telemetry_car_status" */
export type Telemetry_Car_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Car_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "telemetry_car_status". All fields are combined with a logical 'AND'. */
export type Telemetry_Car_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Car_Status_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Car_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Car_Status_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Telemetry_Car_Status_Enum {
  /** Car is off track */
  OffTrack = 'OffTrack',
  /** Car is on track */
  OnTrack = 'OnTrack',
}

/** Boolean expression to compare columns of type "telemetry_car_status_enum". All fields are combined with logical 'AND'. */
export type Telemetry_Car_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Telemetry_Car_Status_Enum>;
  _in?: InputMaybe<Array<Telemetry_Car_Status_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Telemetry_Car_Status_Enum>;
  _nin?: InputMaybe<Array<Telemetry_Car_Status_Enum>>;
};

/** aggregate max on columns */
export type Telemetry_Car_Status_Max_Fields = {
  __typename?: 'telemetry_car_status_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Telemetry_Car_Status_Min_Fields = {
  __typename?: 'telemetry_car_status_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "telemetry_car_status". */
export type Telemetry_Car_Status_Order_By = {
  comment?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "telemetry_car_status" */
export enum Telemetry_Car_Status_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "telemetry_car_status" */
export type Telemetry_Car_Status_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Car_Status_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Car_Status_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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

/** order by max() on columns of table "telemetry" */
export type Telemetry_Max_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
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

/** order by min() on columns of table "telemetry" */
export type Telemetry_Min_Order_By = {
  date?: InputMaybe<Order_By>;
  distance?: InputMaybe<Order_By>;
  distance_to_driver_ahead?: InputMaybe<Order_By>;
  driver_ahead?: InputMaybe<Order_By>;
  driver_session_id?: InputMaybe<Order_By>;
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
  relative_distance?: InputMaybe<Order_By>;
  rpm?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  speed?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  telemetry_car_status?: InputMaybe<Telemetry_Car_Status_Order_By>;
  telemetry_source?: InputMaybe<Telemetry_Sources_Order_By>;
  throttle?: InputMaybe<Order_By>;
  time?: InputMaybe<Order_By>;
  x?: InputMaybe<Order_By>;
  y?: InputMaybe<Order_By>;
  z?: InputMaybe<Order_By>;
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

/** columns and relationships of "telemetry_sources" */
export type Telemetry_Sources = {
  __typename?: 'telemetry_sources';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  telemetries: Array<Telemetry>;
  /** An aggregate relationship */
  telemetries_aggregate: Telemetry_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "telemetry_sources" */
export type Telemetry_SourcesTelemetriesArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** columns and relationships of "telemetry_sources" */
export type Telemetry_SourcesTelemetries_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Telemetry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Telemetry_Order_By>>;
  where?: InputMaybe<Telemetry_Bool_Exp>;
};

/** aggregated selection of "telemetry_sources" */
export type Telemetry_Sources_Aggregate = {
  __typename?: 'telemetry_sources_aggregate';
  aggregate?: Maybe<Telemetry_Sources_Aggregate_Fields>;
  nodes: Array<Telemetry_Sources>;
};

/** aggregate fields of "telemetry_sources" */
export type Telemetry_Sources_Aggregate_Fields = {
  __typename?: 'telemetry_sources_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Telemetry_Sources_Max_Fields>;
  min?: Maybe<Telemetry_Sources_Min_Fields>;
};

/** aggregate fields of "telemetry_sources" */
export type Telemetry_Sources_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Telemetry_Sources_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "telemetry_sources". All fields are combined with a logical 'AND'. */
export type Telemetry_Sources_Bool_Exp = {
  _and?: InputMaybe<Array<Telemetry_Sources_Bool_Exp>>;
  _not?: InputMaybe<Telemetry_Sources_Bool_Exp>;
  _or?: InputMaybe<Array<Telemetry_Sources_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  telemetries?: InputMaybe<Telemetry_Bool_Exp>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Telemetry_Sources_Enum {
  /** Car telemetry source */
  Car = 'car',
  /** Interpolation telemetry source */
  Interpolation = 'interpolation',
  /** Position telemetry source */
  Pos = 'pos',
}

/** Boolean expression to compare columns of type "telemetry_sources_enum". All fields are combined with logical 'AND'. */
export type Telemetry_Sources_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Telemetry_Sources_Enum>;
  _in?: InputMaybe<Array<Telemetry_Sources_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Telemetry_Sources_Enum>;
  _nin?: InputMaybe<Array<Telemetry_Sources_Enum>>;
};

/** aggregate max on columns */
export type Telemetry_Sources_Max_Fields = {
  __typename?: 'telemetry_sources_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Telemetry_Sources_Min_Fields = {
  __typename?: 'telemetry_sources_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "telemetry_sources". */
export type Telemetry_Sources_Order_By = {
  comment?: InputMaybe<Order_By>;
  telemetries_aggregate?: InputMaybe<Telemetry_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "telemetry_sources" */
export enum Telemetry_Sources_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "telemetry_sources" */
export type Telemetry_Sources_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Telemetry_Sources_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Telemetry_Sources_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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
  relative_distance?: InputMaybe<Scalars['numeric']['input']>;
  rpm?: InputMaybe<Scalars['Int']['input']>;
  session_time?: InputMaybe<Scalars['bigint']['input']>;
  source?: InputMaybe<Telemetry_Sources_Enum>;
  speed?: InputMaybe<Scalars['numeric']['input']>;
  status?: InputMaybe<Telemetry_Car_Status_Enum>;
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
  message?: InputMaybe<String_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Track_Status_Max_Fields = {
  __typename?: 'track_status_max_fields';
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "track_status" */
export type Track_Status_Max_Order_By = {
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Track_Status_Min_Fields = {
  __typename?: 'track_status_min_fields';
  message?: Maybe<Scalars['String']['output']>;
  session_id?: Maybe<Scalars['String']['output']>;
  session_time?: Maybe<Scalars['bigint']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "track_status" */
export type Track_Status_Min_Order_By = {
  message?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "track_status". */
export type Track_Status_Order_By = {
  message?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** select columns of table "track_status" */
export enum Track_Status_Select_Column {
  /** column name */
  Message = 'message',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  SessionTime = 'session_time',
  /** column name */
  Status = 'status',
}

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

/** columns and relationships of "tyre_compounds" */
export type Tyre_Compounds = {
  __typename?: 'tyre_compounds';
  comment?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  laps: Array<Laps>;
  /** An aggregate relationship */
  laps_aggregate: Laps_Aggregate;
  value: Scalars['String']['output'];
};

/** columns and relationships of "tyre_compounds" */
export type Tyre_CompoundsLapsArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** columns and relationships of "tyre_compounds" */
export type Tyre_CompoundsLaps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Laps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Laps_Order_By>>;
  where?: InputMaybe<Laps_Bool_Exp>;
};

/** aggregated selection of "tyre_compounds" */
export type Tyre_Compounds_Aggregate = {
  __typename?: 'tyre_compounds_aggregate';
  aggregate?: Maybe<Tyre_Compounds_Aggregate_Fields>;
  nodes: Array<Tyre_Compounds>;
};

/** aggregate fields of "tyre_compounds" */
export type Tyre_Compounds_Aggregate_Fields = {
  __typename?: 'tyre_compounds_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Tyre_Compounds_Max_Fields>;
  min?: Maybe<Tyre_Compounds_Min_Fields>;
};

/** aggregate fields of "tyre_compounds" */
export type Tyre_Compounds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tyre_Compounds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "tyre_compounds". All fields are combined with a logical 'AND'. */
export type Tyre_Compounds_Bool_Exp = {
  _and?: InputMaybe<Array<Tyre_Compounds_Bool_Exp>>;
  _not?: InputMaybe<Tyre_Compounds_Bool_Exp>;
  _or?: InputMaybe<Array<Tyre_Compounds_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  laps?: InputMaybe<Laps_Bool_Exp>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

export enum Tyre_Compounds_Enum {
  /** Hard tyre compound */
  Hard = 'HARD',
  /** Hypersoft tyre compound */
  Hypersoft = 'HYPERSOFT',
  /** Intermediate tyre compound */
  Intermediate = 'INTERMEDIATE',
  /** Medium tyre compound */
  Medium = 'MEDIUM',
  /** Soft tyre compound */
  Soft = 'SOFT',
  /** Supersoft tyre compound */
  Supersoft = 'SUPERSOFT',
  /** Test tyre compound */
  Test = 'TEST',
  /** Unknown test tyre compound */
  TestUnknown = 'TEST_UNKNOWN',
  /** Ultrasoft tyre compound */
  Ultrasoft = 'ULTRASOFT',
  /** Unknown tyre compound */
  Unknown = 'UNKNOWN',
  /** Wet tyre compound */
  Wet = 'WET',
}

/** Boolean expression to compare columns of type "tyre_compounds_enum". All fields are combined with logical 'AND'. */
export type Tyre_Compounds_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Tyre_Compounds_Enum>;
  _in?: InputMaybe<Array<Tyre_Compounds_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Tyre_Compounds_Enum>;
  _nin?: InputMaybe<Array<Tyre_Compounds_Enum>>;
};

/** aggregate max on columns */
export type Tyre_Compounds_Max_Fields = {
  __typename?: 'tyre_compounds_max_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Tyre_Compounds_Min_Fields = {
  __typename?: 'tyre_compounds_min_fields';
  comment?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "tyre_compounds". */
export type Tyre_Compounds_Order_By = {
  comment?: InputMaybe<Order_By>;
  laps_aggregate?: InputMaybe<Laps_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** select columns of table "tyre_compounds" */
export enum Tyre_Compounds_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value',
}

/** Streaming cursor of the table "tyre_compounds" */
export type Tyre_Compounds_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tyre_Compounds_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tyre_Compounds_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "weather_data" */
export type Weather_Data = {
  __typename?: 'weather_data';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
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
  pressure?: InputMaybe<Numeric_Comparison_Exp>;
  rainfall?: InputMaybe<Boolean_Comparison_Exp>;
  session?: InputMaybe<Sessions_Bool_Exp>;
  session_id?: InputMaybe<String_Comparison_Exp>;
  session_time?: InputMaybe<Bigint_Comparison_Exp>;
  track_temperature?: InputMaybe<Numeric_Comparison_Exp>;
  wind_direction?: InputMaybe<Int_Comparison_Exp>;
  wind_speed?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Weather_Data_Max_Fields = {
  __typename?: 'weather_data_max_fields';
  air_temperature?: Maybe<Scalars['numeric']['output']>;
  humidity?: Maybe<Scalars['numeric']['output']>;
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
  pressure?: InputMaybe<Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "weather_data". */
export type Weather_Data_Order_By = {
  air_temperature?: InputMaybe<Order_By>;
  humidity?: InputMaybe<Order_By>;
  pressure?: InputMaybe<Order_By>;
  rainfall?: InputMaybe<Order_By>;
  session?: InputMaybe<Sessions_Order_By>;
  session_id?: InputMaybe<Order_By>;
  session_time?: InputMaybe<Order_By>;
  track_temperature?: InputMaybe<Order_By>;
  wind_direction?: InputMaybe<Order_By>;
  wind_speed?: InputMaybe<Order_By>;
};

/** select columns of table "weather_data" */
export enum Weather_Data_Select_Column {
  /** column name */
  AirTemperature = 'air_temperature',
  /** column name */
  Humidity = 'humidity',
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
    year?: number | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      driver?: {
        __typename?: 'drivers';
        full_name?: string | null;
        number?: string | null;
        headshot_url?: string | null;
        country_code?: string | null;
      } | null;
      session?: {
        __typename?: 'sessions';
        name?: Session_Name_Choices_Enum | null;
        event?: {
          __typename?: 'events';
          round_number?: number | null;
          name?: string | null;
          year?: number | null;
        } | null;
      } | null;
      results: Array<{
        __typename?: 'results';
        points?: bigint | number | null;
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

export type GetMapEventsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;

export type GetMapEventsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    round_number?: number | null;
    name?: string | null;
    location?: string | null;
    date?: string | null;
    country?: string | null;
    format?: Event_Format_Choices_Enum | null;
    sessions: Array<{
      __typename?: 'sessions';
      circuit?: {
        __typename?: 'circuits';
        country?: string | null;
        latitude?: bigint | number | null;
        longitude?: bigint | number | null;
      } | null;
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        results: Array<{
          __typename?: 'results';
          classified_position?: string | null;
        }>;
        driver?: {
          __typename?: 'drivers';
          full_name?: string | null;
          headshot_url?: string | null;
        } | null;
        constructorByConstructorId?: {
          __typename?: 'constructors';
          name?: string | null;
          color?: string | null;
        } | null;
      }>;
    }>;
  }>;
};

export type GetNextEventQueryVariables = Exact<{
  today: Scalars['String']['input'];
}>;

export type GetNextEventQuery = {
  __typename?: 'query_root';
  schedule: Array<{
    __typename?: 'schedule';
    year?: number | null;
    event_name?: string | null;
    location?: string | null;
    country?: string | null;
    event_format?: Event_Format_Choices_Enum | null;
    session5_date_utc?: string | null;
  }>;
};

export type GetSeasonEventsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;

export type GetSeasonEventsQuery = {
  __typename?: 'query_root';
  schedule: Array<{
    __typename?: 'schedule';
    year?: number | null;
    round_number?: number | null;
    event_name?: string | null;
    event_format?: Event_Format_Choices_Enum | null;
    event_date?: string | null;
    location?: string | null;
    country?: string | null;
    session1?: Session_Name_Choices_Enum | null;
    session1_date?: string | null;
    session2?: Session_Name_Choices_Enum | null;
    session2_date?: string | null;
    session3?: Session_Name_Choices_Enum | null;
    session3_date?: string | null;
    session4?: Session_Name_Choices_Enum | null;
    session4_date?: string | null;
    session5?: Session_Name_Choices_Enum | null;
    session5_date?: string | null;
  }>;
};

export type GetEventScheduleQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
}>;

export type GetEventScheduleQuery = {
  __typename?: 'query_root';
  dropdown_events: Array<{
    __typename?: 'schedule';
    event_name?: string | null;
    round_number?: number | null;
    location?: string | null;
  }>;
  schedule: Array<{
    __typename?: 'schedule';
    year?: number | null;
    round_number?: number | null;
    event_date?: string | null;
    official_event_name?: string | null;
    event_name?: string | null;
    event_format?: Event_Format_Choices_Enum | null;
    location?: string | null;
    country?: string | null;
    session1?: Session_Name_Choices_Enum | null;
    session1_date_utc?: string | null;
    session2?: Session_Name_Choices_Enum | null;
    session2_date_utc?: string | null;
    session3?: Session_Name_Choices_Enum | null;
    session3_date_utc?: string | null;
    session4?: Session_Name_Choices_Enum | null;
    session4_date_utc?: string | null;
    session5?: Session_Name_Choices_Enum | null;
    session5_date_utc?: string | null;
  }>;
};

export type GetEventDetailsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
}>;

export type GetEventDetailsQuery = {
  __typename?: 'query_root';
  events: Array<{
    __typename?: 'events';
    competition: Array<{
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        driver?: {
          __typename?: 'drivers';
          abbreviation?: string | null;
          full_name?: string | null;
          number?: string | null;
          headshot_url?: string | null;
        } | null;
        constructorByConstructorId?: {
          __typename?: 'constructors';
          color?: string | null;
        } | null;
        results: Array<{
          __typename?: 'results';
          finishing_position?: number | null;
          classified_position?: string | null;
          grid_position?: number | null;
          total_race_time?: bigint | null;
        }>;
        fastest_lap: Array<{
          __typename?: 'laps';
          lap_time?: bigint | null;
          lap_number?: number | null;
        }>;
      }>;
    }>;
    qualifying: Array<{
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        driver?: {
          __typename?: 'drivers';
          abbreviation?: string | null;
          full_name?: string | null;
          number?: string | null;
          headshot_url?: string | null;
        } | null;
        constructorByConstructorId?: {
          __typename?: 'constructors';
          color?: string | null;
        } | null;
        results: Array<{
          __typename?: 'results';
          finishing_position?: number | null;
          q1_time?: bigint | null;
          q2_time?: bigint | null;
          q3_time?: bigint | null;
        }>;
      }>;
    }>;
    practices: Array<{
      __typename?: 'sessions';
      scheduled_start_time_utc?: string | null;
      name?: Session_Name_Choices_Enum | null;
      driver_sessions: Array<{
        __typename?: 'driver_sessions';
        driver?: {
          __typename?: 'drivers';
          abbreviation?: string | null;
          full_name?: string | null;
          number?: string | null;
          headshot_url?: string | null;
        } | null;
        constructorByConstructorId?: {
          __typename?: 'constructors';
          color?: string | null;
        } | null;
        fastest_lap: Array<{
          __typename?: 'laps';
          lap_time?: bigint | null;
          lap_number?: number | null;
        }>;
      }>;
    }>;
  }>;
};

export type GetStandingsQueryVariables = Exact<{
  season: Scalars['Int']['input'];
}>;

export type GetStandingsQuery = {
  __typename?: 'query_root';
  drivers: Array<{
    __typename?: 'drivers';
    abbreviation?: string | null;
    full_name?: string | null;
    latest_constructor: Array<{
      __typename?: 'driver_sessions';
      constructor?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
    }>;
    driver_standings: Array<{
      __typename?: 'driver_standings';
      round?: number | null;
      points?: bigint | number | null;
      position?: number | null;
    }>;
  }>;
  constructors: Array<{
    __typename?: 'constructors';
    name?: string | null;
    color?: string | null;
    constructor_standings: Array<{
      __typename?: 'constructor_standings';
      round?: number | null;
      points?: bigint | number | null;
      position?: number | null;
    }>;
  }>;
};

export type SessionResultsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type SessionResultsQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    name?: Session_Name_Choices_Enum | null;
    event?: { __typename?: 'events'; name?: string | null } | null;
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
        number?: string | null;
        headshot_url?: string | null;
      } | null;
      results: Array<{
        __typename?: 'results';
        grid_position?: number | null;
        finishing_position?: number | null;
        points?: bigint | number | null;
        status?: string | null;
        classified_position?: string | null;
        total_race_time?: bigint | null;
      }>;
      fastest_lap: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        lap_time?: bigint | null;
        sector1?: bigint | null;
        sector2?: bigint | null;
        sector3?: bigint | null;
      }>;
      fastest_sector1: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector1?: bigint | null;
      }>;
      fastest_sector2: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector2?: bigint | null;
      }>;
      fastest_sector3: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        stint?: number | null;
        sector3?: bigint | null;
      }>;
    }>;
  }>;
};

export type GetSessionStintsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type GetSessionStintsQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
      } | null;
      laps: Array<{
        __typename?: 'laps';
        stint?: number | null;
        tyre_life?: number | null;
        fresh_tyre?: boolean | null;
        tyre_compound?: { __typename?: 'tyre_compounds'; value: string } | null;
      }>;
    }>;
  }>;
};

export type GetSessionLapTimesQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  event: Scalars['String']['input'];
  session: Session_Name_Choices_Enum;
}>;

export type GetSessionLapTimesQuery = {
  __typename?: 'query_root';
  sessions: Array<{
    __typename?: 'sessions';
    driver_sessions: Array<{
      __typename?: 'driver_sessions';
      constructorByConstructorId?: {
        __typename?: 'constructors';
        name?: string | null;
        color?: string | null;
      } | null;
      driver?: {
        __typename?: 'drivers';
        abbreviation?: string | null;
        full_name?: string | null;
        number?: string | null;
      } | null;
      laps: Array<{
        __typename?: 'laps';
        lap_number?: number | null;
        lap_time?: bigint | null;
        compound?: Tyre_Compounds_Enum | null;
        session_time?: bigint | null;
      }>;
    }>;
  }>;
};

export const GetConstructorsDocument = gql`
  query GetConstructors @cached {
    constructors(
      where: { driver_sessions: { session: { date: { _iregex: "2025" } } } }
      order_by: { name: asc }
      distinct_on: name
    ) {
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
  query GetConstructor($_id: String!) @cached {
    constructors(where: { ergast_id: { _eq: $_id } }) {
      name
      color
      year
      driver_sessions(
        order_by: { session: { event: { year: asc } } }
        where: { session: { total_laps: { _is_null: false } } }
      ) {
        driver {
          full_name
          number
          headshot_url
          country_code
        }
        session {
          name
          event {
            round_number
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
  query GetDrivers @cached {
    drivers(
      where: { driver_sessions: { session: { date: { _iregex: "2025" } } } }
      order_by: { full_name: asc }
      distinct_on: full_name
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
  query GetSeasons @cached {
    events(distinct_on: year, order_by: { year: desc }) {
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
export const GetMapEventsDocument = gql`
  query GetMapEvents($year: Int!) @cached {
    events(where: { year: { _eq: $year } }) {
      round_number
      name
      location
      date
      country
      format
      sessions(limit: 1, where: { name: { _eq: Race } }) {
        circuit {
          country
          latitude
          longitude
        }
        driver_sessions(
          limit: 3
          where: { results: { classified_position: { _in: ["1", "2", "3"] } } }
        ) {
          results {
            classified_position
          }
          driver {
            full_name
            headshot_url
          }
          constructorByConstructorId {
            name
            color
          }
        }
      }
    }
  }
`;

/**
 * __useGetMapEventsQuery__
 *
 * To run a query within a React component, call `useGetMapEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMapEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMapEventsQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetMapEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMapEventsQuery,
    GetMapEventsQueryVariables
  > &
    (
      | { variables: GetMapEventsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMapEventsQuery, GetMapEventsQueryVariables>(
    GetMapEventsDocument,
    options,
  );
}
export function useGetMapEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMapEventsQuery,
    GetMapEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMapEventsQuery, GetMapEventsQueryVariables>(
    GetMapEventsDocument,
    options,
  );
}
export function useGetMapEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMapEventsQuery,
        GetMapEventsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetMapEventsQuery, GetMapEventsQueryVariables>(
    GetMapEventsDocument,
    options,
  );
}
export type GetMapEventsQueryHookResult = ReturnType<
  typeof useGetMapEventsQuery
>;
export type GetMapEventsLazyQueryHookResult = ReturnType<
  typeof useGetMapEventsLazyQuery
>;
export type GetMapEventsSuspenseQueryHookResult = ReturnType<
  typeof useGetMapEventsSuspenseQuery
>;
export type GetMapEventsQueryResult = Apollo.QueryResult<
  GetMapEventsQuery,
  GetMapEventsQueryVariables
>;
export const GetNextEventDocument = gql`
  query GetNextEvent($today: String!) {
    schedule(
      where: { event_date: { _gte: $today } }
      order_by: { event_date: asc }
      limit: 1
    ) {
      year
      event_name
      location
      country
      event_format
      session5_date_utc
    }
  }
`;

/**
 * __useGetNextEventQuery__
 *
 * To run a query within a React component, call `useGetNextEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNextEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNextEventQuery({
 *   variables: {
 *      today: // value for 'today'
 *   },
 * });
 */
export function useGetNextEventQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNextEventQuery,
    GetNextEventQueryVariables
  > &
    (
      | { variables: GetNextEventQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNextEventQuery, GetNextEventQueryVariables>(
    GetNextEventDocument,
    options,
  );
}
export function useGetNextEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNextEventQuery,
    GetNextEventQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNextEventQuery, GetNextEventQueryVariables>(
    GetNextEventDocument,
    options,
  );
}
export function useGetNextEventSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetNextEventQuery,
        GetNextEventQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetNextEventQuery, GetNextEventQueryVariables>(
    GetNextEventDocument,
    options,
  );
}
export type GetNextEventQueryHookResult = ReturnType<
  typeof useGetNextEventQuery
>;
export type GetNextEventLazyQueryHookResult = ReturnType<
  typeof useGetNextEventLazyQuery
>;
export type GetNextEventSuspenseQueryHookResult = ReturnType<
  typeof useGetNextEventSuspenseQuery
>;
export type GetNextEventQueryResult = Apollo.QueryResult<
  GetNextEventQuery,
  GetNextEventQueryVariables
>;
export const GetSeasonEventsDocument = gql`
  query GetSeasonEvents($year: Int!) @cached {
    schedule(where: { year: { _eq: $year } }) {
      year
      round_number
      event_name
      event_format
      event_date
      location
      country
      session1
      session1_date
      session2
      session2_date
      session3
      session3_date
      session4
      session4_date
      session5
      session5_date
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
export const GetEventScheduleDocument = gql`
  query GetEventSchedule($year: Int!, $event: String!) @cached {
    dropdown_events: schedule(
      where: { location: { _neq: $event }, year: { _eq: $year } }
    ) {
      event_name
      round_number
      location
    }
    schedule(
      where: { year: { _eq: $year }, location: { _eq: $event } }
      limit: 1
    ) {
      year
      round_number
      event_date
      official_event_name
      event_name
      event_format
      location
      country
      session1
      session1_date_utc
      session2
      session2_date_utc
      session3
      session3_date_utc
      session4
      session4_date_utc
      session5
      session5_date_utc
    }
  }
`;

/**
 * __useGetEventScheduleQuery__
 *
 * To run a query within a React component, call `useGetEventScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventScheduleQuery({
 *   variables: {
 *      year: // value for 'year'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useGetEventScheduleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  > &
    (
      | { variables: GetEventScheduleQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventScheduleQuery, GetEventScheduleQueryVariables>(
    GetEventScheduleDocument,
    options,
  );
}
export function useGetEventScheduleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  >(GetEventScheduleDocument, options);
}
export function useGetEventScheduleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEventScheduleQuery,
        GetEventScheduleQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEventScheduleQuery,
    GetEventScheduleQueryVariables
  >(GetEventScheduleDocument, options);
}
export type GetEventScheduleQueryHookResult = ReturnType<
  typeof useGetEventScheduleQuery
>;
export type GetEventScheduleLazyQueryHookResult = ReturnType<
  typeof useGetEventScheduleLazyQuery
>;
export type GetEventScheduleSuspenseQueryHookResult = ReturnType<
  typeof useGetEventScheduleSuspenseQuery
>;
export type GetEventScheduleQueryResult = Apollo.QueryResult<
  GetEventScheduleQuery,
  GetEventScheduleQueryVariables
>;
export const GetEventDetailsDocument = gql`
  query GetEventDetails($year: Int!, $event: String!) @cached {
    events(
      where: { location: { _eq: $event }, year: { _eq: $year } }
      limit: 1
    ) {
      competition: sessions(
        where: { name: { _in: [Sprint, Race] } }
        limit: 2
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          results {
            finishing_position
            classified_position
            grid_position
            total_race_time
          }
          fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
            lap_time
            lap_number
          }
        }
      }
      qualifying: sessions(
        where: {
          name: { _in: [Sprint_Shootout, Sprint_Qualifying, Qualifying] }
        }
        limit: 2
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          results {
            finishing_position
            q1_time
            q2_time
            q3_time
          }
        }
      }
      practices: sessions(
        limit: 3
        where: { name: { _in: [Practice_1, Practice_2, Practice_3] } }
      ) {
        scheduled_start_time_utc
        name
        driver_sessions {
          driver {
            abbreviation
            full_name
            number
            headshot_url
          }
          constructorByConstructorId {
            color
          }
          fastest_lap: laps(limit: 1, order_by: { lap_time: asc }) {
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
 *      year: // value for 'year'
 *      event: // value for 'event'
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
export const GetStandingsDocument = gql`
  query GetStandings($season: Int!) @cached {
    drivers(where: { driver_standings: { season: { _eq: $season } } }) {
      abbreviation
      full_name
      latest_constructor: driver_sessions(
        limit: 1
        order_by: { session: { date: desc } }
      ) {
        constructor: constructorByConstructorId {
          name
          color
        }
      }
      driver_standings(
        where: { season: { _eq: $season } }
        order_by: { round: asc }
      ) {
        round
        points
        position
      }
    }
    constructors(
      where: { constructor_standings: { season: { _eq: $season } } }
    ) {
      name
      color
      constructor_standings(
        where: { season: { _eq: $season } }
        order_by: { round: asc }
      ) {
        round
        points
        position
      }
    }
  }
`;

/**
 * __useGetStandingsQuery__
 *
 * To run a query within a React component, call `useGetStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStandingsQuery({
 *   variables: {
 *      season: // value for 'season'
 *   },
 * });
 */
export function useGetStandingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetStandingsQuery,
    GetStandingsQueryVariables
  > &
    (
      | { variables: GetStandingsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStandingsQuery, GetStandingsQueryVariables>(
    GetStandingsDocument,
    options,
  );
}
export function useGetStandingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetStandingsQuery,
    GetStandingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStandingsQuery, GetStandingsQueryVariables>(
    GetStandingsDocument,
    options,
  );
}
export function useGetStandingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetStandingsQuery,
        GetStandingsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetStandingsQuery, GetStandingsQueryVariables>(
    GetStandingsDocument,
    options,
  );
}
export type GetStandingsQueryHookResult = ReturnType<
  typeof useGetStandingsQuery
>;
export type GetStandingsLazyQueryHookResult = ReturnType<
  typeof useGetStandingsLazyQuery
>;
export type GetStandingsSuspenseQueryHookResult = ReturnType<
  typeof useGetStandingsSuspenseQuery
>;
export type GetStandingsQueryResult = Apollo.QueryResult<
  GetStandingsQuery,
  GetStandingsQueryVariables
>;
export const SessionResultsDocument = gql`
  query SessionResults(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      name
      event {
        name
      }
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
          headshot_url
        }
        results(
          where: {
            _or: [
              { grid_position: { _is_null: false } }
              { finishing_position: { _is_null: false } }
            ]
          }
        ) {
          grid_position
          finishing_position
          points
          status
          classified_position
          total_race_time
        }
        fastest_lap: laps(order_by: { lap_time: asc }, limit: 1) {
          lap_number
          stint
          lap_time
          sector1
          sector2
          sector3
        }
        fastest_sector1: laps(order_by: { sector1: asc }, limit: 1) {
          lap_number
          stint
          sector1
        }
        fastest_sector2: laps(order_by: { sector2: asc }, limit: 1) {
          lap_number
          stint
          sector2
        }
        fastest_sector3: laps(order_by: { sector3: asc }, limit: 1) {
          lap_number
          stint
          sector3
        }
      }
    }
  }
`;

/**
 * __useSessionResultsQuery__
 *
 * To run a query within a React component, call `useSessionResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionResultsQuery({
 *   variables: {
 *      year: // value for 'year'
 *      event: // value for 'event'
 *      session: // value for 'session'
 *   },
 * });
 */
export function useSessionResultsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SessionResultsQuery,
    SessionResultsQueryVariables
  > &
    (
      | { variables: SessionResultsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SessionResultsQuery, SessionResultsQueryVariables>(
    SessionResultsDocument,
    options,
  );
}
export function useSessionResultsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SessionResultsQuery,
    SessionResultsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SessionResultsQuery, SessionResultsQueryVariables>(
    SessionResultsDocument,
    options,
  );
}
export function useSessionResultsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        SessionResultsQuery,
        SessionResultsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    SessionResultsQuery,
    SessionResultsQueryVariables
  >(SessionResultsDocument, options);
}
export type SessionResultsQueryHookResult = ReturnType<
  typeof useSessionResultsQuery
>;
export type SessionResultsLazyQueryHookResult = ReturnType<
  typeof useSessionResultsLazyQuery
>;
export type SessionResultsSuspenseQueryHookResult = ReturnType<
  typeof useSessionResultsSuspenseQuery
>;
export type SessionResultsQueryResult = Apollo.QueryResult<
  SessionResultsQuery,
  SessionResultsQueryVariables
>;
export const GetSessionStintsDocument = gql`
  query GetSessionStints(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        driver {
          abbreviation
          full_name
        }
        laps {
          stint
          tyre_compound {
            value
          }
          tyre_life
          fresh_tyre
        }
      }
    }
  }
`;

/**
 * __useGetSessionStintsQuery__
 *
 * To run a query within a React component, call `useGetSessionStintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionStintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionStintsQuery({
 *   variables: {
 *      year: // value for 'year'
 *      event: // value for 'event'
 *      session: // value for 'session'
 *   },
 * });
 */
export function useGetSessionStintsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSessionStintsQuery,
    GetSessionStintsQueryVariables
  > &
    (
      | { variables: GetSessionStintsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionStintsQuery, GetSessionStintsQueryVariables>(
    GetSessionStintsDocument,
    options,
  );
}
export function useGetSessionStintsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSessionStintsQuery,
    GetSessionStintsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSessionStintsQuery,
    GetSessionStintsQueryVariables
  >(GetSessionStintsDocument, options);
}
export function useGetSessionStintsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSessionStintsQuery,
        GetSessionStintsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSessionStintsQuery,
    GetSessionStintsQueryVariables
  >(GetSessionStintsDocument, options);
}
export type GetSessionStintsQueryHookResult = ReturnType<
  typeof useGetSessionStintsQuery
>;
export type GetSessionStintsLazyQueryHookResult = ReturnType<
  typeof useGetSessionStintsLazyQuery
>;
export type GetSessionStintsSuspenseQueryHookResult = ReturnType<
  typeof useGetSessionStintsSuspenseQuery
>;
export type GetSessionStintsQueryResult = Apollo.QueryResult<
  GetSessionStintsQuery,
  GetSessionStintsQueryVariables
>;
export const GetSessionLapTimesDocument = gql`
  query GetSessionLapTimes(
    $year: Int!
    $event: String!
    $session: session_name_choices_enum!
  ) @cached {
    sessions(
      limit: 1
      where: {
        event: { year: { _eq: $year }, location: { _eq: $event } }
        name: { _eq: $session }
      }
    ) {
      driver_sessions {
        constructorByConstructorId {
          name
          color
        }
        driver {
          abbreviation
          full_name
          number
        }
        laps(order_by: { lap_number: asc }) {
          lap_number
          lap_time
          compound
          session_time
        }
      }
    }
  }
`;

/**
 * __useGetSessionLapTimesQuery__
 *
 * To run a query within a React component, call `useGetSessionLapTimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionLapTimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionLapTimesQuery({
 *   variables: {
 *      year: // value for 'year'
 *      event: // value for 'event'
 *      session: // value for 'session'
 *   },
 * });
 */
export function useGetSessionLapTimesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  > &
    (
      | { variables: GetSessionLapTimesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GetSessionLapTimesDocument, options);
}
export function useGetSessionLapTimesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GetSessionLapTimesDocument, options);
}
export function useGetSessionLapTimesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSessionLapTimesQuery,
        GetSessionLapTimesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSessionLapTimesQuery,
    GetSessionLapTimesQueryVariables
  >(GetSessionLapTimesDocument, options);
}
export type GetSessionLapTimesQueryHookResult = ReturnType<
  typeof useGetSessionLapTimesQuery
>;
export type GetSessionLapTimesLazyQueryHookResult = ReturnType<
  typeof useGetSessionLapTimesLazyQuery
>;
export type GetSessionLapTimesSuspenseQueryHookResult = ReturnType<
  typeof useGetSessionLapTimesSuspenseQuery
>;
export type GetSessionLapTimesQueryResult = Apollo.QueryResult<
  GetSessionLapTimesQuery,
  GetSessionLapTimesQueryVariables
>;
