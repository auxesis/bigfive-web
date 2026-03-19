'use server';

import { getSupabase } from '@/db';
import { B5Error, DbResult, Feedback } from '@/types';
import calculateScore from '@bigfive-org/score';
import generateResult, {
  getInfo,
  Language,
  Domain
} from '@bigfive-org/results';

const resultLanguages = getInfo().languages;

export type Report = {
  id: string;
  timestamp: number;
  availableLanguages: Language[];
  language: string;
  results: Domain[];
};

export async function getTestResult(
  id: string,
  language?: string
): Promise<Report | undefined> {
  'use server';
  try {
    const { data: report, error } = await getSupabase()
      .from('results')
      .select('id, lang, date_stamp, answers')
      .eq('id', id)
      .single();
    if (error || !report) {
      console.error(`The test results with id ${id} are not found!`);
      throw new B5Error({
        name: 'NotFoundError',
        message: `The test results with id ${id} is not found in the database!`
      });
    }
    const selectedLanguage =
      language ||
      (!!resultLanguages.find((l) => l.id == report.lang) ? report.lang : 'en');
    const scores = calculateScore({ answers: report.answers });
    const results = generateResult({ lang: selectedLanguage, scores });
    return {
      id: report.id,
      timestamp: new Date(report.date_stamp).getTime(),
      availableLanguages: resultLanguages,
      language: selectedLanguage,
      results
    };
  } catch (error) {
    if (error instanceof B5Error) {
      throw error;
    }
    throw new Error('Something wrong happend. Failed to get test result!');
  }
}

export async function saveTest(testResult: DbResult) {
  'use server';
  try {
    const { data, error } = await getSupabase()
      .from('results')
      .insert({
        test_id: testResult.testId,
        lang: testResult.lang,
        invalid: testResult.invalid,
        time_elapsed: testResult.timeElapsed,
        date_stamp: testResult.dateStamp,
        answers: testResult.answers,
      })
      .select('id')
      .single();
    if (error) {
      console.error(error);
      throw new B5Error({
        name: 'SavingError',
        message: 'Failed to save test result!'
      });
    }
    return { id: data.id };
  } catch (error) {
    console.error(error);
    throw new B5Error({
      name: 'SavingError',
      message: 'Failed to save test result!'
    });
  }
}

export type FeebackState = {
  message: string;
  type: 'error' | 'success';
};

export async function saveFeedback(
  prevState: FeebackState,
  formData: FormData
): Promise<FeebackState> {
  'use server';
  const feedback: Feedback = {
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    message: String(formData.get('message'))
  };
  try {
    const { error } = await getSupabase()
      .from('feedback')
      .insert({
        name: feedback.name,
        email: feedback.email,
        message: feedback.message
      });
    if (error) {
      return {
        message: 'Error sending feedback!',
        type: 'error'
      };
    }
    return {
      message: 'Sent successfully!',
      type: 'success'
    };
  } catch (error) {
    return {
      message: 'Error sending feedback!',
      type: 'error'
    };
  }
}
