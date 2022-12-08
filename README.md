Callback edit
----
import React, { useRef, useState, } from "react";
import Head from 'next/head';
import * as Layout from "../../../components/Layout/index";
import TablePage from "../../../components/Atoms/Table/TablePage"
import TableList from "../../../components/Atoms/Table/TableList"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Grid, FormControl, MenuItem, Select, BoxProps, SelectChangeEvent, FormLabel, Button, FormGroup, Checkbox, Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { InputSelect } from "../../../components/Atoms/Select/Select";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useOperatorList } from "../../../features/Operator/Selector";

import { useCallClassList } from "../../../features/CallClass/Selector";
import { StyledHeader, StyledTitleHeader } from "../../../styles/Styled";
import { useDispatch } from "react-redux";
import DataGrid_list from "../../../components/CallBack/DataGrid_list"
import Stack from '@mui/material/Stack';
import ja from 'date-fns/locale/ja'
// import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const Main = (): JSX.Element => {
 
    const [number, setNumber] = useState("");

    const checkInput = (e) => {
      const onlyDigits = e.target.value.replace(/\D/g, "");
      setNumber(onlyDigits);
    };
    // const msgList = useMsgList();
    const [yearMonthDay, setYearMonthDay] = useState<{ yearMonthDaySt: Date; yearMonthDayEd: Date }>({
        yearMonthDaySt: new Date(),
        yearMonthDayEd: new Date(),
    })
    const [hoursMinutes, setHoursMinutes] = useState<{ hoursSt: Date; hoursEd: Date, minutesSt: Date, minutesEd: Date }>({
        hoursSt: new Date(),
        hoursEd: new Date(),
        minutesSt: new Date(),
        minutesEd: new Date(),
    })

    const handleChangeYearMonthDay = (newValue: Date | null, fieldYearMonthDay: string) => {
        setYearMonthDay(prev => ({ ...prev, [fieldYearMonthDay]: newValue }))
    };

    const handleChangeHoursMinutes = (newValue: Date | null, fieldHoursMinutes: string) => {
        setHoursMinutes(prev => ({ ...prev, [fieldHoursMinutes]: newValue }))
    };
    const operatorList = useOperatorList();

    // 担当者セレクトボックス
    const handleOnChangeOperator = (key: string, column: string, value: string | number) => {
        const promise = async () => {
        };
        promise();
    };

    const handleOnChangeHani = (key: string, column: string, value: string | number) => {
        const promise = async () => {
        };
        promise();
    };

    // const [bookYearMonthDay, setBookYearMonthDay] = React.useState<String | null>(
    //     String(new Date()),
    // );
    // const handleBookYearMonthDayChange = (newValue: String | null) => {
    //     setBookYearMonthDay(newValue);
    // };
    const phoneNumber = [
        { label: 'Organise' },
        { label: 'Joha' },
        { label: 'Terminator' },
        { label: 'Dull' },
        { label: 'Nzaza' },
    ];

    return (
        <React.Fragment>
            <Head>
                <title>折り返し更新</title>
            </Head>
            <div>
                <br />
                <br />
                <div style={{ width: "100%" }}>
                    <Box
                        sx={{
                            bgcolor: 'info.main',
                            color: 'background.paper',
                            textAlign: 'center',
                            maxWidth: "55%",
                            // height: "40%",
                            marginTop: "3%"
                        }}
                    >
                        <StyledTitleHeader sx={{}}>
                            <strong>折り返し状態更新</strong>
                        </StyledTitleHeader>
                    </Box>

                    <br />
                    <br />
                    <Box sx={{ flexGrow: 0.2 }}>
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                        }}>
                            {/* 状態を表示する */}
                            <Grid container spacing={2} >
                                <Grid item xs={3} sx={{ marginTop: "12px" }}>
                                    <StyledHeader>
                                        <InputSelect
                                            list={operatorList}
                                            title="状態"
                                            name="operatorNm"
                                            indx="operatorNm"
                                            value="operatorId"
                                            column="operatorNm"
                                            unqkey="operatorId"
                                            defaultValue={''}
                                            onChange={handleOnChangeOperator}
                                            options={{ blank: false, all: false }}
                                        />
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={3}  >
                                    <StyledHeader>
                                        <FormGroup aria-label="position" row >
                                            <FormControlLabel

                                                value="top"
                                                control={<Checkbox />}
                                                label="スナッチ規定数対応"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </StyledHeader>
                                </Grid>
                            </Grid>
                        </Box >
                        <br />
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                        }}>
                            <Grid container spacing={2} >
                                <Grid item xs={3} sx={{ marginTop: "3px" }}>
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <DesktopDatePicker
                                                className='StyledBookYearMonthDay'
                                                inputFormat='yyyy/mm/dd'
                                                mask='____/__/__'
                                                value={yearMonthDay.yearMonthDaySt}
                                                onChange={(newValue) => handleChangeYearMonthDay(newValue, "yearMonthDaySt")}
                                                renderInput={(params) =>
                                                    <TextField

                                                        {...params}
                                                        required
                                                        id="dispDay"
                                                        label="希望日時（yyyy/mm/dd）"
                                                        variant="filled"
                                                        size="small"
                                                        sx={{ width: 250 }}
                                                    />
                                                }
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={1.5} sx={{ marginTop: "3px" }} >
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <TimePicker
                                                ampm={false}
                                                views={["hours"]}
                                                label="時"
                                                mask="__"
                                                inputFormat="HH時"
                                                value={hoursMinutes.hoursSt}
                                                onChange={(newValue) => handleChangeHoursMinutes(newValue, "hoursSt")}
                                                renderInput={(params) => <TextField

                                                    required
                                                    id="time"
                                                    variant="filled"
                                                    size="small"
                                                    sx={{ width: 100 }}
                                                    {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={1.5} sx={{ marginTop: "3px" }} >
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <TimePicker
                                                ampm={false}
                                                views={["minutes"]}
                                                label="分"
                                                inputFormat="mm分"
                                                value={hoursMinutes.minutesSt}
                                                onChange={(newValue) => handleChangeHoursMinutes(newValue, "minutesSt")}
                                                renderInput={(params) => <TextField
                                                    required
                                                    id="minutes"
                                                    variant="filled"
                                                    size="small"
                                                    sx={{ width: 100 }}
                                                    {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={1} >
                                    <StyledHeader>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value="top"
                                                control={<Checkbox />}
                                                label="至急"
                                                labelPlacement="top"
                                            />
                                        </FormGroup>
                                    </StyledHeader>
                                </Grid>
                            </Grid>
                        </Box>
                        <br />
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                        }}>
                            {/* 希望日時を表示する */}
                            <Grid container spacing={1} >
                                <Grid item xs={3}>
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <DesktopDatePicker
                                                className='StyledBookYearMonthDay'
                                                inputFormat='yyyy/mm/dd'
                                                mask='____/__/__'
                                                value={yearMonthDay.yearMonthDayEd}
                                                onChange={(newValue) => handleChangeYearMonthDay(newValue, "yearMonthDayEd")}
                                                renderInput={(params) =>
                                                    <TextField
                                                        {...params}
                                                        required
                                                        id="dispDay"
                                                        label="希望日時（yyyy/mm/dd）"
                                                        variant="filled"
                                                        size="small"
                                                        sx={{ width: 250 }}
                                                    />
                                                }
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={1.5} >
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <TimePicker
                                                ampm={false}
                                                label="時"
                                                inputFormat="HH時"
                                                mask="__"
                                                views={["hours"]}
                                                value={hoursMinutes.hoursEd}
                                                onChange={(newValue) => handleChangeHoursMinutes(newValue, "hoursEd")}
                                                renderInput={(params) => <TextField
                                                    required
                                                    id="time"
                                                    variant="filled"
                                                    size="small"
                                                    sx={{ width: 100 }}
                                                    {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                                <Grid item xs={1} >
                                    <StyledHeader>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                                            <TimePicker
                                                ampm={false}
                                                views={["minutes"]}
                                                label="分"
                                                mask="__"
                                                inputFormat="mm分"
                                                value={hoursMinutes.minutesEd}
                                                onChange={(newValue) => handleChangeHoursMinutes(newValue, "minutesEd")}
                                                renderInput={(params) => <TextField
                                                    required
                                                    id="minutes"
                                                    variant="filled"
                                                    size="small"
                                                    sx={{ width: 100 }}
                                                    {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </StyledHeader>
                                </Grid>
                            </Grid>
                        </Box >
                        <br />
                        <Box sx={{
                            height: '100%',
                            width: '100%',
                        }}>
                            {/* 電話番号を表示する */}
                            <Grid container spacing={1} >
                                <Grid item xs={3}>
                                    <StyledHeader>
                                        <TextField
                                            required
                                            value={number}
                                            onChange={(e) => checkInput(e)}
                                            id="callNumber"
                                            label="電話番号"
                                            variant="filled"
                                            defaultValue="07044778740"
                                            // onChange={(newValue) => setNumber(newValue)}
                                            size="small"
                                            sx={{ width: 250 }}
                                        />
                                    </StyledHeader>
                                </Grid>

                            </Grid>
                        </Box >
                        <br />
                    </Box>
                    <br />

                </div>
            </div>
        </React.Fragment>
    )
};

export const Index = (): JSX.Element => {
    return (
        <React.Fragment>
            <Layout.Index mainComponent={<Main />} title='折り返し状態更新' />
        </React.Fragment>
    );
};

export default Index;

-----
callback inde
-------------

import React, { useRef, useState, } from "react";
import Head from 'next/head';
import * as Layout from "../../../components/Layout/index";
import TablePage from "../../../components/Atoms/Table/TablePage"
import TableList from "../../../components/Atoms/Table/TableList"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Grid, FormControl, MenuItem, Select, BoxProps, SelectChangeEvent, FormLabel, Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { InputSelect } from "../../../components/Atoms/Select/Select";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useOperatorList } from "../../../features/Operator/Selector";

import { useCallClassList } from "../../../features/CallClass/Selector";
import { StyledHeader, StyledTitleHeader } from "../../../styles/Styled";
import { useDispatch } from "react-redux";
import DataGrid_list from "../../../components/CallBack/DataGrid_list"
// import { useInputMsgConditions, useMsgList } from "../../../features/MsgList/Selector";
import ja from 'date-fns/locale/ja'


export const Main = (): JSX.Element => {
  // const msgList = useMsgList();

  const operatorList = useOperatorList();

  // 担当者セレクトボックス
  const handleOnChangeOperator = (key: string, column: string, value: string | number) => {
    const promise = async () => {
    };
    promise();
  };

  const handleOnChangeHani = (key: string, column: string, value: string | number) => {
    const promise = async () => {
    };
    promise();
  };

  const [bookYearMonthDay, setBookYearMonthDay] = React.useState<String | null>(
    String(new Date()),
  );
  const handleBookYearMonthDayChange = (newValue: String | null) => {
    setBookYearMonthDay(newValue);
  };


  return (
    <React.Fragment>
      <Head>
        <title>折返し</title>
      </Head>
      <div>
        折り返し
      </div>
      <div >
        <br />
        <br />
        <br />
        <div style={{ width: "100%" }}>
          <Box sx={{ flexGrow: 0.2 }}>
            <Box sx={{
              height: '100%',
              width: '100%',
            }}>
              <Grid container spacing={1} >
                <Grid item xs={3}>
                  <FormLabel sx={{

                  }}>状態状態</FormLabel>
                  <RadioGroup
                    row
                  >
                    <FormControlLabel value="total" control={<Radio />} label="全て" />
                    <FormControlLabel value="started " control={<Radio />} label="未着手" />
                    <FormControlLabel value="hold" control={<Radio />} label="保留" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={2} >
                  <StyledHeader>
                    <InputSelect
                      list={operatorList}
                      title="プロダクト"
                      name="operatorNm"
                      indx="operatorNm"
                      value="operatorId"
                      column="operatorNm"
                      unqkey="operatorId"
                      defaultValue={''}
                      onChange={handleOnChangeOperator}
                      options={{ blank: false, all: false }}
                    />
                  </StyledHeader>
                </Grid>
              </Grid>
            </Box >
            <br />
            <Box sx={{
              height: '100%',
              width: '100%',
            }}>
              <Grid container spacing={1} >
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <DesktopDatePicker
                      className='StyledBookYearMonthDay'
                      inputFormat='yyyy/mm/dd'
                      mask='____/__/__'
                      value={bookYearMonthDay}
                      onChange={handleBookYearMonthDayChange}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          required
                          id="dispDay"
                          label="完了表示	（yyyy/mm/dd）"
                          variant="filled"
                          size="small"
                          sx={{ width: 250 }}
                        />
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                  <StyledHeader>
                    <InputSelect
                      list={operatorList}
                      title="折り返し種別"
                      name="operatorNm"
                      indx="operatorNm"
                      value="operatorId"
                      column="operatorNm"
                      unqkey="operatorId"
                      defaultValue={''}
                      onChange={handleOnChangeOperator}
                      options={{ blank: false, all: false }}
                    />
                  </StyledHeader>
                </Grid>
                <Grid item xs={4} >
                  <Button color="primary" size='large' variant="contained"
                    sx={{ marginTop: "14px" }}
                  >再表示</Button>
                </Grid>
              </Grid>
            </Box>
            <br />
            <br />
            <Box
              sx={{
                bgcolor: 'info.main',
                color: 'background.paper',
                p: 2,
                textAlign: 'center',
                maxWidth: "100%",
              }}
            >
              <StyledTitleHeader>
                <strong>折り返し一覧</strong>
              </StyledTitleHeader>
            </Box>
            <Box sx={{
              height: '90%',
              width: '100%',
            }}>
              <DataGrid_list />
            </Box>
          </Box>
        </div>
      </div>
    </React.Fragment>
  )
};

export const Index = (): JSX.Element => {
  return (
    <React.Fragment>
      <Layout.Index mainComponent={<Main />} title='折り返し' />
    </React.Fragment>

  );
};

export default Index;
----
datagrip
-----

import React, { useState } from 'react'
import { DataGrid, GridColDef, jaJP } from '@mui/x-data-grid';
import { Button, Grid, Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import NextLink from "next/link";
import { StyledDataGrid } from "../../styles/Styled";
import { ConfirmDiallogProps, ConfirmDiallog } from '../Common/ComfirmDialog';

const DataGrid_list = (props) => {

  const [confirmConfig, setConfirmConfig] = useState<ConfirmDiallogProps | undefined>()
  const [pageSize, setPageSize] = React.useState<number>(10);

  // 改行コード置換（\r\nを<BR/>に）
  const replaceContent = (content) => {
    const str = content.split(/(\r\n)/).map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.match(/\r\n/) ? <br /> : item}
        </React.Fragment>
      );
    });
    return <div style={{ textAlign: 'center' }}>{str}</div>
  }

  const columns: GridColDef[] = [
    {
      field: 'rowNo', headerName: '', type: 'string', width: 50, headerAlign: 'center', align: 'center', flex: 0.5,
      renderCell: (params) => {
        if (!params.row.datFlg) {
          return <NextLink
            href="/CallCenter/CallBack/Edit/"
          >
            <MuiLink sx={{ cursor: 'pointer' }}>{params.row.rowNo}</MuiLink>
          </NextLink>
        } else {
          return params.row.rowNo
        }
      }
    },
    {
      field: 'customerNm', headerName: '顧客名', type: 'string', headerAlign: 'center', align: 'left', flex: 0.8,
      renderCell: (params) => {
        if (!params.row.datFlg) {
          return <NextLink
            href={{
              pathname: "BasicRegist",
              query: { customerCd: params.row.customerCd }
            }} passHref as="BasicRegist"
          >
            <MuiLink>{params.row.customerNm}</MuiLink>
          </NextLink>
        } else {
          return params.row.customerNm
        }
      }
    },
    { field: 'contactableDays', headerName: '入電日時', type: 'string', headerAlign: 'center', flex: 0.8 },
    { field: 'desiredDays', headerName: '希望日時	', type: 'string', headerAlign: 'center', flex: 0.8 },
    {
      field: 'statusNm', headerName: '状態', type: 'string', headerAlign: 'center', flex: 0.5,
      renderCell: (params) => {
        if (!params.row.datFlg) {
          return <NextLink
            href={{
              pathname: "detail",
              query: { customerCd: params.row.customerCd }
            }} passHref as="detail"
          >
            <MuiLink>{params.row.statusNm}</MuiLink>
          </NextLink>
        } else {
          return params.row.statusNm
        }
      }
    },
    { field: 'respondCnt', headerName: '追客回数', type: 'string', headerAlign: 'center', flex: 0.8 },
    { field: 'memo', headerName: 'メモ', type: 'string', headerAlign: 'center', flex: 1 },
    { field: 'inforFd', headerName: 'FD情報', type: 'string', headerAlign: 'center', flex: 0.7 },
    { field: 'callNb', headerName: '電話番号', type: 'string', headerAlign: 'center', flex: 1 },
    { field: 'latestAt', headerName: '最終対応日時', type: 'string', headerAlign: 'center', flex: 0.9 },
    { field: 'customerCd', headerName: '顧客コード', type: 'string', headerAlign: 'center', hide: true },
    { field: 'callbackId', headerName: '折り返し発信ID', type: 'string', headerAlign: 'center', hide: true },
    { field: 'callbackType', headerName: '折り返し種別', type: 'string', headerAlign: 'center', hide: true },
    { field: 'productCd', headerName: 'プロダクトコード', type: 'string', headerAlign: 'center', hide: true },
    { field: 'datFlg', headerName: '論理削除フラグ', type: 'string', headerAlign: 'center', hide: true },
    { field: 'urgentFlg	', headerName: '至急フラグ', type: 'string', headerAlign: 'center', hide: true },
    { field: 'statusDiv', headerName: '状態', type: 'string', headerAlign: 'center', hide: true },
    { field: 'callFlg', headerName: '電話可否フラグ', type: 'string', headerAlign: 'center', hide: true },

  ];

  const rows = [
    {
      id: 1, rowNo: '更新', customerNm: 'スナッチテスト', contactableDays: '2021/12/1', desiredDays: '2022/11/1',
      statusNm: '未着手', respondCnt: 'スナッチテスト', memo: 'お名前：スナッチテスト', inforFd: 'FD情報',
      callNb: '07044778735', latestAt: '2022/12/1', customerCd: '909090',
      callbackId: '78899', callbackType: '', productCd: '2022/12/1', datFlg: false,
      urgentFlg: '2021/11/1', statusDiv: '2022/12/1', callFlg: '2021/11/1',
    },

    {
      id: 2, rowNo: '更新', customerNm: 'テスト太郎', contactableDays: '2022/12/1', desiredDays: '2021/11/1',
      statusNm: '未着手', respondCnt: 'スナッチテスト', memo: 'お名前：テスト太郎', inforFd: '2021/11/1',
      callNb: '0704477834', latestAt: '2022/12/1', customerCd: '2021/11/1',
      callbackId: '2022/12/1', callbackType: '2021/11/1', productCd: '2022/12/1', datFlg: false,
      urgentFlg: '2021/11/1', statusDiv: '2022/12/1', callFlg: '2021/11/1'
    },
  ];
  return (

    <Box
      sx={{
        height: '100%',
        width: '100%'
      }}>

      <div>
        <DataGrid
          sx={StyledDataGrid.grid}
          rows={rows}
          //rows = {props.data}
          // autoHeight
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 15, 30, 50]}
          pagination
          getRowClassName={(params) =>
          // コール結果が"完了"
          {
            if (params.row.callResultFlg == true) {
              return `backGroundColorCallFlg--${params.row.callResultFlg}`
            } else if (params.row.orderStatus == '00009') {   // 保留伝票
              return `backGroundColorOrderStatus--${params.row.orderStatus}`
            } else if (params.row.callClassId == '00001') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00002') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00003') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00004') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00006') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00008') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00011') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00013') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else if (params.row.callClassId == '00014') {
              return `backGroundColorCallClassId--${params.row.callClassId}`
            } else {
              return `backGroundColorOther--Other`
            }
          }}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          disableColumnMenu                     // グリッド内のカラムメニュー無効
          disableSelectionOnClick               // 行選択無効
          density='compact'
        />
        {confirmConfig && <ConfirmDiallog {...confirmConfig} />}
      </div>
    </Box >

  );
}

export default DataGrid_list;
